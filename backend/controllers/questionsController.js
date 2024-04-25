"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quizModel_1 = __importDefault(require("../models/quizModel"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const questionModel_1 = __importDefault(require("../models/questionModel"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const catchAsync = require("../utils/catchError");
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.default("Not an image", 400), false);
    }
};
const upload = (0, multer_1.default)({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.upload = upload.single("coverImage");
exports.resizeQuizPhoto = catchAsync(async (req, res, next) => {
    console.log(req.body, req.file);
    if (!req.file)
        return next();
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await cloudinary_1.default.uploader.upload(dataURI, {
        resource_type: "auto",
    });
    console.log(cldRes.secure_url);
    req.body.coverImage = cldRes.secure_url;
    next();
});
exports.addQuestionToQuiz = catchAsync(async (req, res, next) => {
    const { question, answers, correctAnswerIndex, explain, coverImage, } = req.body;
    let hint = req.body.hint || {};
    if (hint.coverImage) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await cloudinary_1.default.uploader.upload(dataURI, { resource_type: "auto" });
        hint.coverImage = cldRes.secure_url; // Set coverImage in hint object
    }
    const newQuestion = await questionModel_1.default.create({
        question,
        answers,
        correctAnswerIndex,
        quiz: req.params.quizId,
        explain, coverImage, hint
    });
    const quiz = await quizModel_1.default.findById(req.params.quizId);
    if (!quiz)
        return next(new AppError_1.default("quiz not found", 404));
    quiz.questions.push(newQuestion._id);
    await quiz.save();
    res.status(201).json({ status: "success", data: { newQuestion } });
});
exports.deleteQuestionFromQuiz = catchAsync(async (req, res, next) => {
    const quiz = await quizModel_1.default.findOne({ questions: req.params.questionId });
    if (!quiz) {
        return next(new AppError_1.default("Quiz not found", 404));
    }
    console.log(quiz);
    const newQuestions = quiz.questions.filter((question) => question._id !== req.params.questionId);
    if (!newQuestions) {
        return next(new AppError_1.default("Question not found in the quiz", 404));
    }
    quiz.questions = newQuestions;
    await quiz.save();
    const deletedQuestion = await questionModel_1.default.findByIdAndDelete(req.params.questionId);
    if (!deletedQuestion) {
        return next(new AppError_1.default("Question not found", 404));
    }
    res.status(201).json({ status: "success", data: null });
});
exports.editQuestionFromQuiz = catchAsync(async (req, res, next) => {
    const quiz = await quizModel_1.default.findById(req.params.quizId);
    console.log(quiz, req.params);
    if (!quiz) {
        return next(new AppError_1.default("Quiz not found", 404));
    }
    const editedQuestion = await questionModel_1.default.findByIdAndUpdate(req.params.questionId, req.body);
    if (editedQuestion === null || editedQuestion === void 0 ? void 0 : editedQuestion.coverImage)
        editedQuestion.coverImage = req.body.coverImage;
    if (!editedQuestion) {
        return next(new AppError_1.default("Question not found", 404));
    }
    res.status(201).json({ status: "success", data: editedQuestion });
});
const questionFactory = new handlerFactory_1.default(questionModel_1.default, "Question");
exports.getQuestion = questionFactory.getOne("questionId");
exports.getAllQuestions = questionFactory.getAll();
