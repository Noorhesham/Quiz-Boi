const catchAsync = require("../utils/catchError");
import { NextFunction, Request, Response } from "express";
import Tag from "../models/TagModel";

exports.getQuizTags =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tags=await Tag.find()
    res.status(200).json({
      status: 'success',
      data: {
        tags
      }
    });
  });
  exports.postTags =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tag=await Tag.create(req.body)
    res.status(200).json({
        status: 'success',
        data: {
          tag
        }
      });
  });