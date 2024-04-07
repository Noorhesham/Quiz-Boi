import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import User from "../models/userModel";
import Factory from "./handlerFactory";
import multer from "multer";
import sharp, { FormatEnum } from "sharp";
import { UserProps } from "../types";
const catchAsync = require("../utils/catchError");
declare module "express-serve-static-core" {
  interface Request {
    user: UserProps;
  }
}

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req: Request, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.uploadUserPhoto = upload.single("photo");
exports.resizeUserPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();
  const ext = req.file.mimetype.split("/")[1];
  const formatKey = ext as keyof FormatEnum;
  console.log(ext, `user-${req.user.id}.${ext}`,formatKey);
  req.file.filename = `user-${req.user.id}.${ext}`;
  sharp(req.file.buffer).resize(500, 500).toFormat(`${formatKey}`).toFile(`public/img/users/${req.file.filename}`);
  next();
});

const filteredObj: any = (obj: any, ...allowedFields: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => allowedFields.includes(key) && (newObj[key] = obj[key]));
  //create a new field in the new object which value is the value of that field in the old object
  //this applies only if that field in allowed in the arr
  return newObj;
};

exports.getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)
    
  if (!user) return next(new AppError("cannot find this user", 404));
  res.status(200).json({ status: "success", data: { user } });
});

exports.getMe = async (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, req.file);
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError("you cannot update password in this route", 400));
  //2)update user doc
  const updatedData = filteredObj(req.body, "name", "email", "photo");
  if (req.file) updatedData.photo = req.file.filename;
  console.log(req.body, req.file);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: "success", data: updatedUser });
});

exports.followUser = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const currentUser = req.user;
  const userToFollow = await User.findById(req.params.userId);
  console.log(userToFollow, currentUser);
  if (!userToFollow) return next(new AppError("cannot find this user", 404));
  currentUser.follow(req.params.userId);
  userToFollow.followers.push(currentUser._id);
  await Promise.all([currentUser.save(), userToFollow.save()]);
  res.status(200).json({ status: "success", data: { currentUser } });
});

exports.unfollowUser = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const currentUser = req.user;
  const userToUnfollow = await User.findById(req.params.userId);
  if (userToUnfollow) {
    userToUnfollow.followers = userToUnfollow.followers.filter((userId: String) => userId !== currentUser._id);
    await userToUnfollow.save();
  }
  await currentUser.save();
  res.status(200).json({ status: "success", data: { currentUser } });
});
const userFactory = new Factory(User, "user");
exports.getAllUsers = userFactory.getAll();
exports.getUser = userFactory.getOne();
exports.updateUser = userFactory.updateOne();
exports.deleteUser = userFactory.deleteOne();
