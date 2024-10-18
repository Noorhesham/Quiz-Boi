"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAttemptsModel_1 = __importDefault(require("../models/userAttemptsModel"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync = require("../utils/catchError");
exports.checkIfAuthor = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const attempt = yield userAttemptsModel_1.default.findById(req.params.id);
    console.log(req.params);
    console.log(attempt === null || attempt === void 0 ? void 0 : attempt.userId, req.user.id);
    if ((attempt === null || attempt === void 0 ? void 0 : attempt.userId.toString()) !== req.user.id && req.user.role !== "admin")
        return next(new AppError_1.default(`You cannot edit someone's else attempt.`, 403));
    next();
}));
exports.getUserAttemptStats = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const user = yield userAttemptsModel_1.default.find({ userId: req.params.id }).populate({
        path: "userId",
        select: "public",
    });
    // if (!user?.public && !req.user) return next(new AppError(`This Account is private ..`, 404));
    const userAttempts = yield userAttemptsModel_1.default.find({ userId: req.params.id }).populate({
        path: "quizId",
        select: "title",
    });
    if (!userAttempts)
        return next(new AppError_1.default(`There is no quiz found with that id`, 404));
    const totalAttempts = userAttempts.length;
    const totalPoints = userAttempts.reduce((acc, attempt) => acc + attempt.points, 0);
    const averagePercentage = totalAttempts > 0 ? (totalPoints / totalAttempts) * 100 : 0;
    const additionalStats = yield userAttemptsModel_1.default.aggregate([
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
}));
exports.updateAttempt = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let editedDoc = yield userAttemptsModel_1.default.findByIdAndUpdate(req.params.id, { isPublic: req.body.isPublic }, {
        runValidators: true,
        new: true,
    }).select("-answers");
    if (!editedDoc)
        return next(new AppError_1.default(`There is no attempt found with that id`, 404));
    res.status(201).json({ status: "success", data: { editedDoc } });
}));
// exports.leaderBoard=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const leaderboard=await UserAttempt.find({quizId:req.params.quizId}).populate({path:'userId'}).select('-answers')
// })
const attemptfactory = new handlerFactory_1.default(userAttemptsModel_1.default, "attempt");
exports.getAllAttempts = attemptfactory.getAll({ path: "userId" }, "", { isPublic: { $ne: false } });
exports.getAttempt = attemptfactory.getOne("id", { path: "quizId", select: "questions answers usersAttempted author" });
//# sourceMappingURL=attemptController.js.map