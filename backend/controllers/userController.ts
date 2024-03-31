import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import User from "../models/userModel";
const catchAsync = require("../utils/catchError");

exports.getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)
    .populate({ path: "quizzes", select: "title questionNum tags " })
    .populate({ path: "likedQuizzes", select: "quiz -user" })
    .populate({ path: "attemptedQuizzes" });
  if (!user) return next(new AppError("cannot find this user", 404));
  res.status(200).json({ status: "success", data: { user } });
});

exports.getMe = async (req: any, res: Response, next: NextFunction) => {
  req.params.id = req.user.id;
  next();
};