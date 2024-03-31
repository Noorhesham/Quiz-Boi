import { NextFunction, Request, Response } from "express";
import Quiz from "../models/quizModel";
import AppError from "../utils/AppError";
import UserAttempt from "../models/userAttemptsModel";
import Factory from "./handlerFactory";
import Likes from "../models/likesModel";
const catchAsync = require("../utils/catchError");

exports.addAuthor = (req: any, res: Response, next: NextFunction) => {
  req.body.author = req.user.id;
  next();
};

exports.completeQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  // Check if user attempt exists for this quiz
  if (!req.params.quizId)
    return next(new AppError("this attempt must relate to a quiz ! provide id of quiz in the url", 404));
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) return next(new AppError("could not find a quiz with that id!", 404));
  let userAttempt = await UserAttempt.findOne({ username: req.body.username, userId: req.user?.id });
  // If user attempt doesn't exist, create a new one
  if (!userAttempt) {
    userAttempt = await UserAttempt.create({
      userId: req.body.userId,
      username: req.body.username,
      quizId: req.params.quizId,
      points: req.body.points,
    });
    quiz.usersAttempted.push(userAttempt._id);
    await quiz.save();
  } else {
    // Update existing user attempt with new points
    userAttempt.points = req.body.points;
    quiz.usersAttempted.push(userAttempt._id);
    await quiz.save();
    await userAttempt.save();
  }
  res.status(201).json({
    status: "success",
    data: { userAttempt },
  });
});

// exports.topAttempts= catchAsync(async (req: any, res: Response, next: NextFunction) => {
//   await Quiz.aggregate([
//     {$match:{_id:req.params.id}},
//   ])
// })


exports.likeQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError("you are not loggedin!", 404));
  const like = await Likes.create({ user: req.user, quiz: req.params.quizId });
  res.status(201).json({ status: "success", data: { like } });
});

exports.unLikeQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError("you are not loggedin!", 404));
  const like = await Likes.findOneAndDelete({ user: req.user, quiz: req.params.quizId });
  if (!like) return next(new AppError("user has not liked this quiz!", 404));
  res.status(201).json({ status: "success", data: null });
});

exports.checkIfAuthor = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const quiz = await Quiz.findById(req.params.quizId);
  if (quiz?.author.id !== req.user.id) return next(new AppError(`You cannot edit someone's else quiz.`, 403));
  next();
});

const quizFactory = new Factory(Quiz, "quiz");
exports.uploadQuiz = quizFactory.createOne();
exports.getAllQuizes = quizFactory.getAll();
exports.getQuiz = quizFactory.getOne();
exports.updateQuiz = quizFactory.updateOne();
exports.deleteQuiz = quizFactory.deleteOne();
