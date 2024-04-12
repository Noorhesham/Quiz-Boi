"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quizModel_1 = __importDefault(require("../models/quizModel"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const userAttemptsModel_1 = __importDefault(require("../models/userAttemptsModel"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const likesModel_1 = __importDefault(require("../models/likesModel"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const questionModel_1 = __importDefault(require("../models/questionModel"));
const ApiFeatures_1 = __importDefault(require("../utils/ApiFeatures"));
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
exports.addAuthor = (req, res, next) => {
    req.body.author = req.user.id;
    next();
};
exports.completeQuiz = catchAsync(async (req, res, next) => {
    const quizId = req.params.quizId;
    const { username, userId, answers } = req.body;
    if (!quizId)
        return next(new AppError_1.default("This attempt must relate to a quiz! Provide the ID of the quiz in the URL", 404));
    const quiz = await quizModel_1.default.findById(quizId);
    if (!quiz)
        return next(new AppError_1.default("Could not find a quiz with that ID!", 404));
    let userAttempt = await userAttemptsModel_1.default.findOne({ quizId, userId });
    console.log(userAttempt);
    if (!userAttempt) {
        userAttempt = await userAttemptsModel_1.default.create({
            userId,
            username,
            quizId,
            answers,
            points: 0
        });
        quiz.usersAttempted.push(userAttempt._id);
    }
    else {
        if (userAttempt.attemptedAt && userAttempt.attemptedAt >= new Date(Date.now() - 12 * 60 * 60 * 1000))
            return next(new AppError_1.default("Attempt made within the last 12 hours. Cannot update.", 403));
    }
    let totalPoints = 0;
    console.log(req.body);
    for (let i = 0; i < req.body.answers.length; i++) {
        const question = await questionModel_1.default.findById(req.body.answers[i].id);
        console.log(question && question.correctAnswerIndex === req.body.answers[i].answer);
        if (!question) {
            console.log("Question not found for ID:", req.body.answers[i].id);
            continue;
        }
        if (question.correctAnswerIndex === +req.body.answers[i].answer)
            userAttempt.points += question.points || 10;
        totalPoints += question.points || 10;
        userAttempt.percentage = (userAttempt.points / totalPoints) * 100;
        userAttempt.answers = answers;
        userAttempt.totalPoints = totalPoints;
        userAttempt.attemptedAt = new Date(Date.now());
        quiz.usersAttempted = quiz.usersAttempted.filter((id) => id !== (userAttempt === null || userAttempt === void 0 ? void 0 : userAttempt._id));
        quiz.usersAttempted.push(userAttempt._id);
    }
    await Promise.all([quiz.save(), userAttempt.save()]);
    res.status(201).json({ status: "success", data: { userAttempt } });
});
exports.publishQuiz = catchAsync(async (req, res, next) => {
    const quiz = await quizModel_1.default.findById(req.params.quizId);
    console.log(quiz);
    if (!quiz)
        return next(new AppError_1.default("could not find a quiz with that id!", 404));
    quiz.published = true;
    await quiz.save();
    res.status(201).json({ status: "success", data: { quiz } });
});
exports.likeQuiz = catchAsync(async (req, res, next) => {
    if (!req.user)
        return next(new AppError_1.default("you are not loggedin!", 404));
    const like = await likesModel_1.default.create({ user: req.user, quiz: req.params.quizId });
    res.status(201).json({ status: "success", data: { like } });
});
exports.unLikeQuiz = catchAsync(async (req, res, next) => {
    if (!req.user)
        return next(new AppError_1.default("you are not loggedin!", 404));
    const like = await likesModel_1.default.findOneAndDelete({ user: req.user, quiz: req.params.quizId });
    if (!like)
        return next(new AppError_1.default("user has not liked this quiz!", 404));
    res.status(201).json({ status: "success", data: null });
});
exports.checkIfAuthor = catchAsync(async (req, res, next) => {
    var _a, _b;
    console.log(req.params);
    const quiz = await quizModel_1.default.findById(req.params.id || req.params.quizId);
    console.log(((_a = quiz === null || quiz === void 0 ? void 0 : quiz.author) === null || _a === void 0 ? void 0 : _a._id) !== req.user.id, quiz === null || quiz === void 0 ? void 0 : quiz.author._id, req.user.id);
    if (((_b = quiz === null || quiz === void 0 ? void 0 : quiz.author) === null || _b === void 0 ? void 0 : _b.id) !== req.user.id && req.user.role !== "admin")
        return next(new AppError_1.default(`You cannot edit someone's else quiz.`, 403));
    next();
});
exports.solveQuiz = catchAsync(async (req, res, next) => {
    const quiz = await quizModel_1.default.findById(req.params.quizId || req.params.id).populate({
        path: "questions",
        select: "-correctAnswerIndex -explaination",
    });
    if (!quiz)
        return next(new AppError_1.default("could not find a quiz with that id!", 404));
    const attempt = quiz === null || quiz === void 0 ? void 0 : quiz.usersAttempted.filter((a) => a.userId === req.body.userId);
    //@ts-ignore
    if (attempt.attemptedAt && attempt.attemptedAt >= new Date(Date.now() - 12 * 60 * 60 * 1000))
        return next(new AppError_1.default("Attempt made within the last 12 hours. Cannot update.", 403));
    res.status(201).json({ status: "success", data: { quiz } });
    next();
});
const quizFactory = new handlerFactory_1.default(quizModel_1.default, "quiz");
exports.uploadQuiz = quizFactory.createOne();
exports.getAllQuizes = catchAsync(async (req, res, next) => {
    let filters = {};
    if (req.params.quizId)
        filters = { quizId: req.params.quizId };
    //@ts-ignore
    filters.published = true;
    let query = quizModel_1.default.find(filters)
        .populate({ path: "author", select: "name photo " })
        .populate({ path: "likes" })
        .populate({ path: "comments" });
    // Create a separate query to get the total count of documents
    const totalDocsQuery = quizModel_1.default.find(filters).countDocuments();
    const { query: paginatedQuery, queryString } = new ApiFeatures_1.default(query, req.query)
        .filter()
        .paginate()
        .sort()
        .limitFields();
    const quizzes = await paginatedQuery;
    // Execute the query to get the total count of documents
    const totalResults = await totalDocsQuery;
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalResults / (queryString.limit || 10));
    if (!quizzes || quizzes.length === 0) {
        return next(new AppError_1.default(`There are no quizzes found with that id`, 404));
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
exports.deleteQuiz = quizFactory.deleteOne();
