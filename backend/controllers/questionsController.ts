import { NextFunction, Request, Response } from "express";
import Quiz from "../models/quizModel";
import AppError from "../utils/AppError";
const catchAsync = require("../utils/catchError");

exports.addQuestionToQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const { question, answers, correctAnswerIndex } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      {
        $push: { questions: { question, answers, correctAnswerIndex } },
        $inc: { questionNum: 1 },
      },
      { new: true }
    );
    if (!quiz) return next(new AppError("quiz not found", 404));
    res.status(201).json({ status: "success", data: { quiz } });
  });
  
  exports.deleteQuestionFromQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const deletedQuestion = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      {
        $pull: {
          questions: { _id: req.params.questionId },
        },
        $inc: { questionNum: -1 },
      },
      { new: true }
    );
    if (!deletedQuestion) return next(new AppError("quiz not found", 404));
    res.status(201).json({ status: "success", data: { deletedQuestion } });
  });
  
  exports.editQuestionFromQuiz = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const { quizId, questionId } = req.params;
    const { question, answers, correctAnswerIndex } = req.body;
    const updatedQuiz = await Quiz.findOneAndUpdate(
      { _id: quizId, "questions._id": questionId },
      {
        $set: {
          "questions.$.question": question,
          "questions.$.answers": answers,
          "questions.$.correctAnswerIndex": correctAnswerIndex,
        },
      },
      { new: true } // Return the updated document
    );
    if (!updatedQuiz) return next(new AppError("quiz not found", 404));
    res.status(201).json({ status: "success", data: { updatedQuiz } });
  });
  