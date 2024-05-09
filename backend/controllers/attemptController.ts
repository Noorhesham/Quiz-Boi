import { NextFunction, Request, Response } from "express";
import UserAttempt, { UserAttemptProps } from "../models/userAttemptsModel";
import Factory from "./handlerFactory";
import AppError from "../utils/AppError";
const catchAsync = require("../utils/catchError");

exports.getUserAttemptStats =  catchAsync(async (req: Request|any, res: Response, next: NextFunction) => {
      const userAttempts: UserAttemptProps[] = await UserAttempt.find({ userId: req.user.id });
      if(!userAttempts)  return next(new AppError(`There is no quiz found with that id`, 404));
        const totalAttempts: number = userAttempts.length;
      const totalPoints: number = userAttempts.reduce((acc, attempt) => acc + attempt.points, 0);
      const averagePercentage: number = totalAttempts > 0 ? (totalPoints / totalAttempts) * 100 : 0;
      const additionalStats = await UserAttempt.aggregate([
        { $match: { userId: req.params.userId } },
        { $group: { _id: null, maxPoints: { $max: '$points' }, minPoints: { $min: '$points' } } },
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          totalAttempts,
          totalPoints,
          averagePercentage,
          additionalStats,userAttempts
        },
      });
    
  });

const attemptfactory=new Factory(UserAttempt,"attempt")
exports.getAllAttempts = attemptfactory.getAll();
exports.getAttempt = attemptfactory.getOne("id",{path: "quizId" ,select:"questions answers usersAttempted"});
