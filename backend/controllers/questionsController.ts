import { NextFunction, Request, Response } from "express";
import Quiz from "../models/quizModel";
import AppError from "../utils/AppError";
import Question from "../models/questionModel";
import Factory from "./handlerFactory";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
import { UserProps } from "../types";
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
  console.log(cldRes.secure_url)
  req.body.coverImage = cldRes.secure_url;
  next();
});

exports.addQuestionToQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const { question, answers, correctAnswerIndex, explain,coverImage, } = req.body;
  let  hint = req.body.hint || {};
  if (hint.coverImage) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await cloudinary.uploader.upload(dataURI, { resource_type: "auto" });
    hint.coverImage = cldRes.secure_url; // Set coverImage in hint object
  }
  const newQuestion = await Question.create({
    question,
    answers,
    correctAnswerIndex,
    quiz: req.params.quizId,
    explain,coverImage,hint
  });
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) return next(new AppError("quiz not found", 404));
  //@ts-ignore
  quiz.questions.push(newQuestion._id);
  await quiz.save();
  res.status(201).json({ status: "success", data: { newQuestion } });
});

exports.deleteQuestionFromQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const quiz = await Quiz.findOne({ questions: req.params.questionId });
  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }
  console.log(quiz);
  const newQuestions = quiz.questions.filter((question) => question._id !== req.params.questionId);
  if (!newQuestions) {
    return next(new AppError("Question not found in the quiz", 404));
  }
  quiz.questions = newQuestions;
  await quiz.save();
  const deletedQuestion = await Question.findByIdAndDelete(req.params.questionId);
  if (!deletedQuestion) {
    return next(new AppError("Question not found", 404));
  }
  res.status(201).json({ status: "success", data: null });
});

exports.editQuestionFromQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const quiz = await Quiz.findById(req.params.quizId);
  console.log(quiz, req.params);
  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }
  const editedQuestion = await Question.findByIdAndUpdate(req.params.questionId, req.body);
  if (editedQuestion?.coverImage) editedQuestion.coverImage = req.body.coverImage;
  if (!editedQuestion) {
    return next(new AppError("Question not found", 404));
  }
  res.status(201).json({ status: "success", data: editedQuestion });
});
const questionFactory = new Factory(Question, "Question");
exports.getQuestion = questionFactory.getOne("questionId");
exports.getAllQuestions = questionFactory.getAll();
