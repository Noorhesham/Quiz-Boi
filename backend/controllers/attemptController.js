"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAttemptsModel_1 = __importDefault(require("../models/userAttemptsModel"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync = require("../utils/catchError");
exports.getUserAttemptStats = catchAsync(async (req, res, next) => {
    console.log(req.params);
    const user = await userAttemptsModel_1.default.find({ userId: req.params.id }).populate({
        path: "userId",
        select: "public",
    });
    // if (!user?.public && !req.user) return next(new AppError(`This Account is private ..`, 404));
    const userAttempts = await userAttemptsModel_1.default.find({ userId: req.params.id }).populate({
        path: "quizId",
        select: "title",
    });
    if (!userAttempts)
        return next(new AppError_1.default(`There is no quiz found with that id`, 404));
    const totalAttempts = userAttempts.length;
    const totalPoints = userAttempts.reduce((acc, attempt) => acc + attempt.points, 0);
    const averagePercentage = totalAttempts > 0 ? (totalPoints / totalAttempts) * 100 : 0;
    const additionalStats = await userAttemptsModel_1.default.aggregate([
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
const attemptfactory = new handlerFactory_1.default(userAttemptsModel_1.default, "attempt");
exports.getAllAttempts = attemptfactory.getAll();
exports.getAttempt = attemptfactory.getOne("id", { path: "quizId", select: "questions answers usersAttempted" });
