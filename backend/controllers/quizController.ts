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
import Map from "../models/mapModel";
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
  const { username, userId, answers, isPublic, sessionId } = req.body;
  console.log(answers, username, userId, isPublic);
  if (!quizId)
    return next(new AppError("This attempt must relate to a quiz! Provide the ID of the quiz in the URL", 404));

  const quiz = await Quiz.findById(quizId);

  if (!quiz) return next(new AppError("Could not find a quiz with that ID!", 404));

  const find = userId ? { quizId, userId } : { quizId, username };
  let userAttempt = await UserAttempt.findOne(find);

  if (!userAttempt) {
    userAttempt = await UserAttempt.create({
      userId: userId || undefined,
      username: username || undefined,
      quizId,
      answers,
      points: 0,
      isPublic,
      sessionId,
    });
    if (!userAttempt || !userAttempt._id) {
      return next(new AppError("Failed to create a user attempt.", 500));
    }

    await Quiz.findByIdAndUpdate(quizId, { $push: { usersAttempted: userAttempt._id }, done: true });
  }

  let totalPoints = 0;
  let points = 0;

  for (let i = 0; i < answers?.length; i++) {
    const question = await Question.findById(answers[i].id);
    if (!question) continue;

    if (question.correctAnswerIndex === +answers[i].answer) {
      points += question.points || 10;
    }
    totalPoints += question.points || 10;
  }

  const percentage = (points / totalPoints) * 100;
  const updatedAttempt = await UserAttempt.findOneAndUpdate(
    find,
    {
      $set: {
        points,
        answers,
        totalPoints,
        percentage,
        attemptedAt: new Date(Date.now()),
        sessionId,
      },
    },
    { new: true }
  );

  res.status(201).json({ status: "success", data: { userAttempt: updatedAttempt } });
});

// else {
//   if (userAttempt.attemptedAt && userAttempt.attemptedAt >= new Date(Date.now() - 12 * 60 * 60 * 1000))
//     return next(new AppError("Attempt made within the last 12 hours. Cannot update.", 403));
// }

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
  const quiz = await Quiz.findById(req.params.id || req.params.quizId).populate("author");
  console.log(req.user.id, quiz, req.params);

  console.log(quiz?.author?._id !== req.user.id, quiz?.author._id, req.user.id);
  if (quiz?.author?.id !== req.user.id && req.user.role !== "admin")
    return next(new AppError(`You cannot edit someone's else quiz.`, 403));
  next();
});

exports.solveQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const quiz = await Quiz.findById(req.params.quizId || req.params.id).populate({
    path: "questions",
    select: "-correctAnswerIndex -explain",
  });
  if (!quiz) return next(new AppError("could not find a quiz with that id!", 404));
  const attempt = quiz?.usersAttempted.filter((a: any) => a.userId === req.body.userId);
  //@ts-ignore
  // if (attempt.attemptedAt && attempt.attemptedAt >= new Date(Date.now() - 12 * 60 * 60 * 1000))
  //   return next(new AppError("Attempt made within the last 12 hours. Cannot update.", 403));
  res.status(201).json({ status: "success", data: { quiz } });
  next();
});

const quizFactory = new Factory(Quiz, "quiz");
exports.uploadQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const newDoc = await Quiz.create(req.body);
  if (req.body.map) {
    const updatedMap = await Map.findOneAndUpdate(
      { _id: req.body.map },
      {
        $push: {
          levels: {
            quizId: newDoc._id,
            position: { x: 0, y: 0 },
            difficulty: req.body.difficulty || "medium",
          },
        },
      },
      { new: true }
    );

    if (!updatedMap) {
      return res.status(404).json({ status: "fail", message: "Map not found" });
    }
  }
  console.log(newDoc);
  res.status(200).json({ status: "success", data: { quiz: newDoc } });
});
exports.getAll = quizFactory.getAll();
exports.getAllQuizes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
  let filters = {};
  if (req.params.quizId) filters = { quizId: req.params.quizId };
  if (req.params.map) filters = { map: req.params.map };
  //@ts-ignore
  filters.published = true;

  let query = Quiz.find(filters)
    .select("-questions -usersAttempted")
    .populate({
      path: "author",
    })
    .populate({ path: "likes" })
    .populate({ path: "comments" });

  // Create a separate query to get the total count of documents
  const totalDocsQuery = Quiz.find(filters).countDocuments();

  const { query: paginatedQuery, queryString } = new ApiFeatures(query, req.query)
    .filter()
    .paginate()
    .sort()
    .limitFields();
  let quizzes = await paginatedQuery;

  // Execute the query to get the total count of documents
  const totalResults = await totalDocsQuery;
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalResults / (queryString.limit || 10));

  if (!quizzes || quizzes.length === 0) {
    return next(new AppError(`There are no quizzes found with that id`, 404));
  }

  res.status(200).json({
    status: "success",
    results: quizzes.length,
    totalResults,
    totalPages,
    data: { quizzes },
  });
});

exports.getQuiz = quizFactory.getOne("id", { path: "questions" });
exports.updateQuiz = quizFactory.updateOne();
exports.deleteQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Find and delete the quiz
  const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);

  // Check if quiz exists
  if (!deletedQuiz) {
    return next(new AppError(`There is no Quiz found with that id`, 404));
  }

  // Step 2: Remove the quiz from all maps where it exists in the levels array
  await Map.updateMany({ "levels.quizId": req.params.id }, { $pull: { levels: { quizId: req.params.id } } });

  // Step 3: Return success response
  res.status(200).json({ status: "success", data: null });
});
