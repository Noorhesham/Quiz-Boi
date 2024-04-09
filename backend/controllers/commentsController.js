"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentsModel_1 = __importDefault(require("../models/commentsModel"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const catchAsync = require("../utils/catchError");
exports.addComment = catchAsync(async (req, res, next) => {
    const user = req.user;
    if (!user)
        return next(new AppError_1.default("you are not loggedin!", 404));
    const comment = await commentsModel_1.default.create({ content: req.body.content, user: req.user.id, quizId: req.params.quizId });
    res.status(201).json({ status: "success", data: { comment } });
});
exports.checkIfAuthor = catchAsync(async (req, res, next) => {
    const comment = await commentsModel_1.default.findById(req.params.id);
    if ((comment === null || comment === void 0 ? void 0 : comment.user.id) !== req.user.id)
        return next(new AppError_1.default(`You cannot edit someone's else Comment.`, 403));
    next();
});
const commentsFactory = new handlerFactory_1.default(commentsModel_1.default, "comment");
exports.getAllComments = commentsFactory.getAll();
exports.editComment = commentsFactory.updateOne();
exports.deleteComment = commentsFactory.deleteOne();
exports.getComment = commentsFactory.getOne();
