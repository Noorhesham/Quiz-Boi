import { NextFunction, Request, Response } from "express";
import Quiz from "../models/quizModel";
import AppError from "../utils/AppError";
import UserAttempt from "../models/userAttemptsModel";
import Factory from "./handlerFactory";
import Likes from "../models/likesModel";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
import { UserProps } from "../types";
import Question from "../models/questionModel";
import ApiFeatures from "../utils/ApiFeatures";
const catchAsync = require("../utils/catchError");
declare module "express-serve-static-core" {
  interface Request {
    user: UserProps;
  }
}

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.upload = upload.single("coverImage");
exports.resizeQuizPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, req.file);
  if (!req.file) return next();
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  console.log(cldRes.secure_url);
  req.body.coverImage = cldRes.secure_url;
  next();
});

exports.addAuthor = (req: Request, res: Response, next: NextFunction) => {
  req.body.author = req.user.id;
  next();
};

exports.completeQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const quizId = req.params.quizId;
  const { username, userId, answers } = req.body;

  if (!quizId)
    return next(new AppError("This attempt must relate to a quiz! Provide the ID of the quiz in the URL", 404));

  const quiz = await Quiz.findById(quizId);
  if (!quiz) return next(new AppError("Could not find a quiz with that ID!", 404));

  let userAttempt = await UserAttempt.findOne({ quizId, userId });
  console.log(userAttempt);
  if (!userAttempt) {
    userAttempt = await UserAttempt.create({
      userId,
      username,
      quizId,
      answers,
      points:0
    });
    quiz.usersAttempted.push(userAttempt._id);
  } else {
    if (userAttempt.attemptedAt && userAttempt.attemptedAt >= new Date(Date.now() - 12 * 60 * 60 * 1000))
      return next(new AppError("Attempt made within the last 12 hours. Cannot update.", 403));
  }
  let totalPoints = 0;
  console.log(req.body);
  for (let i = 0; i < req.body.answers.length; i++) {
    const question = await Question.findById(req.body.answers[i].id);
    console.log(question && question.correctAnswerIndex === req.body.answers[i].answer);
    if (!question) {
      console.log("Question not found for ID:", req.body.answers[i].id);
      continue;
    }
    if (question.correctAnswerIndex === +req.body.answers[i].answer) userAttempt.points += question.points || 10;
    totalPoints += question.points || 10;
    userAttempt.percentage = (userAttempt.points / totalPoints) * 100;
    userAttempt.answers = answers;
    userAttempt.totalPoints=totalPoints
    userAttempt.attemptedAt = new Date(Date.now());
    quiz.usersAttempted = quiz.usersAttempted.filter((id) => id !== userAttempt?._id);
    quiz.usersAttempted.push(userAttempt._id);
  }
  await Promise.all([quiz.save(), userAttempt.save()]);
  res.status(201).json({ status: "success", data: { userAttempt } });
});

exports.publishQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const quiz = await Quiz.findById(req.params.quizId);
  console.log(quiz);
  if (!quiz) return next(new AppError("could not find a quiz with that id!", 404));
  quiz.published = true;
  await quiz.save();
  res.status(201).json({ status: "success", data: { quiz } });
});

exports.likeQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError("you are not loggedin!", 404));
  const like = await Likes.create({ user: req.user, quiz: req.params.quizId });
  res.status(201).json({ status: "success", data: { like } });
});

exports.unLikeQuiz = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError("you are not loggedin!", 404));
  const like = await Likes.findOneAndDelete({ user: req.user, quiz: req.params.quizId });
  if (!like) return next(new AppError("user has not liked this quiz!", 404));
  res.status(201).json({ status: "success", data: null });
});

exports.checkIfAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
  const quiz = await Quiz.findById(req.params.id || req.params.quizId);
  console.log(quiz?.author?._id !== req.user.id, quiz?.author._id, req.user.id);
  if (quiz?.author?.id !== req.user.id && req.user.role !== "admin")
    return next(new AppError(`You cannot edit someone's else quiz.`, 403));
  next();
});

exports.solveQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const quiz = await Quiz.findById(req.params.quizId || req.params.id).populate({
    path: "questions",
    select: "-correctAnswerIndex -explaination",
  });
  if (!quiz) return next(new AppError("could not find a quiz with that id!", 404));
  const attempt = quiz?.usersAttempted.filter((a: any) => a.userId === req.body.userId);
  //@ts-ignore
  if (attempt.attemptedAt && attempt.attemptedAt >= new Date(Date.now() - 12 * 60 * 60 * 1000))
    return next(new AppError("Attempt made within the last 12 hours. Cannot update.", 403));
  res.status(201).json({ status: "success", data: { quiz } });
  next();
});

const quizFactory = new Factory(Quiz, "quiz");
exports.uploadQuiz = quizFactory.createOne();
exports.getAllQuizes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let filters = {};
  if (req.params.quizId) filters = { quizId: req.params.quizId };
  //@ts-ignore
  filters.published = true;
  let query = Quiz.find(filters)
    .populate({ path: "author", select: "name photo " })
    .populate({ path: "likes" })
    .populate({ path: "comments" });
  const quizzes = await new ApiFeatures(query, req.query).filter().paginate().sort().limitFields().query;
  console.log(quizzes);
  if (!quizzes) return next(new AppError(`There is no quiz found with that id`, 404));
  res.status(200).json({ status: "success", results: quizzes.length, data: { quizzes } });
});

exports.getQuiz = quizFactory.getOne("id", { path: "questions" });
exports.updateQuiz = quizFactory.updateOne();
exports.deleteQuiz = quizFactory.deleteOne();
