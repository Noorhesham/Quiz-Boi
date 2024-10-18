import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import Factory from "./handlerFactory";
import cloudinary from "../utils/cloudinary";
import Map from "../models/mapModel";
import multer from "multer";
const catchAsync = require("../utils/catchError");

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.upload = upload.single("mapImage");
exports.resizeMapPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, req.file);
  if (!req.file) return next();
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  console.log(cldRes.secure_url);
  req.body.mapImage = cldRes.secure_url;
  next();
});
export const createMap = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, levels, author, mapImage } = req.body;
  console.log(req.body, req.file);
  const map = await Map.create({ name, levels, author: req.user.id, mapImage });
  res.status(201).json({
    status: "success",
    data: { map },
  });
});
const MapFactory = new Factory(Map, "map");

export const updateMap = MapFactory.updateOne();
export const getAllMaps = MapFactory.getAll();
export const getMap = MapFactory.getOne();
export const deleteMap = MapFactory.deleteOne();

export const checkIfAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const map = await Map.findById(req.params.id);
  if (!map || map.author.toString() !== req.user.id) {
    return next(new AppError(`You are not authorized to perform this action`, 403));
  }
  next();
});
export const updatePositions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const map = await Map.findById(req.params.id);
  if (!map) return next(new AppError(`There is no map found with that id`, 404));

  // Iterate over the incoming levels from the request body
  const incomingLevels = req.body;
  console.log("Incoming Levels:", incomingLevels);
  console.log("Existing Map Levels:", map.levels);

  incomingLevels.forEach((incomingLevel: any) => {
    const index = map.levels.findIndex(
      (existingLevel: any) => String(existingLevel.quizId.id) === String(incomingLevel.quizId)
    );
    console.log("Index found:", index, map.levels[index]);

    if (index !== -1) {
      // Update position if the quizId matches
      map.levels[index].position = incomingLevel.position;
    }
  });

  // Save the updated map
  await map.save();

  res.status(200).json({ status: "success", data: { map } });
});
