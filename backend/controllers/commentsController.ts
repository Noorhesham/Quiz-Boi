import { NextFunction, Request, Response } from "express";
import Comments from "../models/commentsModel";
import AppError from "../utils/AppError";
import Factory from "./handlerFactory";
const catchAsync = require("../utils/catchError");

exports.addComment = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) return next(new AppError("you are not loggedin!", 404));
  const comment = await Comments.create({ content: req.body.content, user: req.user.id, quizId: req.params.quizId });
  res.status(201).json({ status: "success", data: { comment } });
});

exports.checkIfAuthor = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const comment = await Comments.findById(req.params.id);
  if (comment?.user.id !== req.user.id) return next(new AppError(`You cannot edit someone's else Comment.`, 403));
  next();
});

const commentsFactory = new Factory(Comments, "comment");
exports.getAllComments = commentsFactory.getAll();
exports.editComment = commentsFactory.updateOne();
exports.deleteComment = commentsFactory.deleteOne();
exports.getComment = commentsFactory.getOne();
