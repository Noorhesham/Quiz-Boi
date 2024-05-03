import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import User from "../models/userModel";
import Factory from "./handlerFactory";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
import { UserProps } from "../types";
import Quiz from "models/quizModel";
const catchAsync = require("../utils/catchError");
declare module "express-serve-static-core" {
  interface Request {
    user: UserProps;
  }
}

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.upload = upload.single("photo");
exports.resizeQuizPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, req.file);
  if (!req.file) return next();
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  console.log(cldRes.secure_url);
  req.body.photo = cldRes.secure_url;
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
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("cannot find this user", 404));
  res.status(200).json({ status: "success", data: { user } });
});
exports.getDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)
    .populate({ path: "quizzes" })
    .populate({ path: "likedQuizzes" })
    .populate({ path: "attemptedQuizzes" });

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
  const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: "success", data: updatedUser });
});

exports.followUser = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const currentUser = req.user;
  const userToFollow = await User.findById(req.params.id);
  if (currentUser === userToFollow._id) return next(new AppError("You are already Cannot follow yourself !", 400));
  console.log(userToFollow, currentUser);
  if (!userToFollow) return next(new AppError("You are already following this user.", 400));
  if (currentUser.following.includes(req.params.id)) return next(new AppError("cannot find this user", 404));
  currentUser.following.push(req.params.id);
  userToFollow.followers.push(currentUser._id);
  await Promise.all([currentUser.save(), userToFollow.save()]);
  res.status(200).json({ status: "success", data: { currentUser } });
});

exports.unfollowUser = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const currentUser = req.user;
  if (!currentUser.following.includes(id)) return next(new AppError("You are not following this user.", 400));
  currentUser.following = currentUser.following.filter((id: String) => id.toString() !== req.params.id);
  await currentUser.save();
  const followedUser = await User.findById(id);
  followedUser.followers = followedUser.followers.filter((id: String) => id.toString() !== currentUser._id.toString());
  await followedUser.save();
  res.status(200).json({ message: "Successfully unfollowed user." });
});

exports.getUserMini = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) return next(new AppError(`There is no userfound with that id`, 404));
  res.status(200).json({ status: "success", data: { user } });
});
exports.getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)
    .populate({ path: "quizzes" })
    .populate({ path: "likedQuizzes" })
    .populate({ path: "attemptedQuizzes" });

  if (!user) return next(new AppError(`There is no user found with that id`, 404));
  res.status(200).json({ status: "success", data: { user } });
});

exports.getFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id).populate({
    path: "followers",
    options: {
      select: "photo name _id",
      skip: req.query.page ? (parseInt(req.query.page as string, 10) - 1) * 10 : 0,
      limit: 10,
    },
  });
  if (!user) return next(new AppError(`There is no userfound with that id`, 404));
  const followers = user.followers;
  res.status(200).json({ status: "success", results: user.following.length, data: { followers } });
});

exports.getFollowing = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id).populate({
    path: "following",
    options: {
      select: "photo name _id",
      skip: req.query.page ? (parseInt(req.query.page as string, 10) - 1) * 10 : 0,
      limit: 10,
    },
  });
  if (!user) return next(new AppError(`There is no userfound with that id`, 404));
  const following = user.following;
  res.status(200).json({ status: "success", results: user.following.length, data: { following } });
});

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
exports.becauseYouFollowed = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user);
  const quizzesPromises = user.following.map(async (followedUser: any) => {
    if (followedUser !== req.user) {
      const followedUserData = await User.findById(followedUser).populate("quizzes");
      return followedUserData.quizzes.filter((quiz: any) => quiz.published === true);
    }
  });
  const quizzesArrays = await Promise.all(quizzesPromises);
  const quizzes = quizzesArrays.flat();
  const shuffledQuizzes = shuffleArray(quizzes);
  const suggestedQuizzes = shuffledQuizzes.slice(0, 10);
  console.log(quizzes, quizzesArrays);
  res.status(200).json({ status: "success", data: { results: suggestedQuizzes.length, suggestedQuizzes } });
});
const userFactory = new Factory(User, "user");
exports.getAllUsers = userFactory.getAll();
exports.updateUser = userFactory.updateOne();
exports.deleteUser = userFactory.deleteOne();
