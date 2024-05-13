import { NextFunction, Request, Response } from "express";
import UserAttempt, { UserAttemptProps } from "../models/userAttemptsModel";
import Factory from "./handlerFactory";
import AppError from "../utils/AppError";
import { UserProps } from "types";
const catchAsync = require("../utils/catchError");

exports.checkIfAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const attempt = await UserAttempt.findById(req.params.id);
  console.log(req.params);
  console.log(attempt?.userId, req.user.id);
  if (attempt?.userId.toString() !== req.user.id && req.user.role !== "admin")
    return next(new AppError(`You cannot edit someone's else attempt.`, 403));
  next();
});

exports.getUserAttemptStats = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  console.log(req.params);
  const user: UserProps | any = await UserAttempt.find({ userId: req.params.id }).populate({
    path: "userId",
    select: "public",
  });
  // if (!user?.public && !req.user) return next(new AppError(`This Account is private ..`, 404));

  const userAttempts: UserAttemptProps[] = await UserAttempt.find({ userId: req.params.id }).populate({
    path: "quizId",
    select: "title",
  });
  if (!userAttempts) return next(new AppError(`There is no quiz found with that id`, 404));
  const totalAttempts: number = userAttempts.length;
  const totalPoints: number = userAttempts.reduce((acc, attempt) => acc + attempt.points, 0);
  const averagePercentage: number = totalAttempts > 0 ? (totalPoints / totalAttempts) * 100 : 0;
  const additionalStats = await UserAttempt.aggregate([
    { $match: { userId: req.params.userId } },
    { $group: { _id: null, maxPoints: { $max: "$points" }, minPoints: { $min: "$points" } } },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      totalAttempts,
      totalPoints,
      averagePercentage,
      additionalStats,
      userAttempts,
    },
  });
});

exports.updateAttempt = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let editedDoc = await UserAttempt.findByIdAndUpdate(req.params.id, {isPublic:req.body.isPublic}, {
    runValidators: true,
    new: true,
  }).select('-answers');
  if (!editedDoc) return next(new AppError(`There is no attempt found with that id`, 404));
  res.status(201).json({ status: "success", data: { editedDoc } });
});
// exports.leaderBoard=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const leaderboard=await UserAttempt.find({quizId:req.params.quizId}).populate({path:'userId'}).select('-answers')
// })
const attemptfactory = new Factory(UserAttempt, "attempt");
exports.getAllAttempts = attemptfactory.getAll({ path: "userId" }, "-answers ", { isPublic: { $ne: false } });
exports.getAttempt = attemptfactory.getOne("id", { path: "quizId", select: "questions answers usersAttempted author" });
