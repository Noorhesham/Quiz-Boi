import { NextFunction, Request, Response } from "express";
import Games from "../models/multiplayerModel";
import AppError from "../utils/AppError";
import Factory from "./handlerFactory";
const catchAsync = require("../utils/catchError");
exports.getGame = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const game = await Games.findOne({ sessionId: req.params.id });
  if (!game) {
    return next(new AppError(`There is no game found with that id`, 404));
  }
  res.status(200).json({ status: "success", data: { game } });
});
const gamefactory = new Factory(Games, "game");
exports.getAllGames = gamefactory.getAll();
exports.createGame = gamefactory.createOne();
exports.updateGame = gamefactory.updateOne();
