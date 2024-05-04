"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const catchAsync = require("../utils/catchError");
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.default("Not an image", 400), false);
    }
};
const upload = (0, multer_1.default)({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.upload = upload.single("photo");
exports.resizeQuizPhoto = catchAsync(async (req, res, next) => {
    console.log(req.body, req.file);
    if (!req.file)
        return next();
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await cloudinary_1.default.uploader.upload(dataURI, {
        resource_type: "auto",
    });
    console.log(cldRes.secure_url);
    req.body.photo = cldRes.secure_url;
    next();
});
const filteredObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => allowedFields.includes(key) && (newObj[key] = obj[key]));
    //create a new field in the new object which value is the value of that field in the old object
    //this applies only if that field in allowed in the arr
    return newObj;
};
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await userModel_1.default.findById(req.params.id);
    if (!user)
        return next(new AppError_1.default("cannot find this user", 404));
    res.status(200).json({ status: "success", data: { user } });
});
exports.getDetails = catchAsync(async (req, res, next) => {
    const user = await userModel_1.default.findById(req.params.id)
        .populate({ path: "quizzes" })
        .populate({ path: "likedQuizzes" })
        .populate({ path: "attemptedQuizzes" });
    if (!user)
        return next(new AppError_1.default("cannot find this user", 404));
    res.status(200).json({ status: "success", data: { user } });
});
exports.getMe = async (req, res, next) => {
    req.params.id = req.user.id;
    next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
    console.log(req.body, req.file);
    if (req.body.password || req.body.passwordConfirm)
        return next(new AppError_1.default("you cannot update password in this route", 400));
    //2)update user doc
    const updatedData = filteredObj(req.body, "name", "email", "photo");
    const updatedUser = await userModel_1.default.findByIdAndUpdate(req.user.id, updatedData, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({ status: "success", data: updatedUser });
});
exports.followUser = catchAsync(async (req, res, next) => {
    const currentUser = req.user;
    const userToFollow = await userModel_1.default.findById(req.params.id);
    if (currentUser === userToFollow._id)
        return next(new AppError_1.default("You are already Cannot follow yourself !", 400));
    console.log(userToFollow, currentUser);
    if (!userToFollow)
        return next(new AppError_1.default("You are already following this user.", 400));
    if (currentUser.following.includes(req.params.id))
        return next(new AppError_1.default("cannot find this user", 404));
    currentUser.following.push(req.params.id);
    userToFollow.followers.push(currentUser._id);
    await Promise.all([currentUser.save(), userToFollow.save()]);
    res.status(200).json({ status: "success", data: { currentUser } });
});
exports.unfollowUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const currentUser = req.user;
    if (!currentUser.following.includes(id))
        return next(new AppError_1.default("You are not following this user.", 400));
    currentUser.following = currentUser.following.filter((id) => id.toString() !== req.params.id);
    await currentUser.save();
    const followedUser = await userModel_1.default.findById(id);
    followedUser.followers = followedUser.followers.filter((id) => id.toString() !== currentUser._id.toString());
    await followedUser.save();
    res.status(200).json({ message: "Successfully unfollowed user." });
});
exports.getUserMini = catchAsync(async (req, res, next) => {
    const user = await userModel_1.default.findById(req.params.id).lean();
    if (!user)
        return next(new AppError_1.default(`There is no userfound with that id`, 404));
    res.status(200).json({ status: "success", data: { user } });
});
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await userModel_1.default.findById(req.params.id)
        .populate({ path: "quizzes" })
        .populate({ path: "likedQuizzes", select: "quiz" })
        .populate({ path: "attemptedQuizzes" });
    if (!user)
        return next(new AppError_1.default(`There is no user found with that id`, 404));
    res.status(200).json({ status: "success", data: { user } });
});
exports.getFollowers = catchAsync(async (req, res, next) => {
    const user = await userModel_1.default.findById(req.params.id).populate({
        path: "followers",
        options: {
            select: "photo name _id",
            skip: req.query.page ? (parseInt(req.query.page, 10) - 1) * 10 : 0,
            limit: 10,
        },
    });
    if (!user)
        return next(new AppError_1.default(`There is no userfound with that id`, 404));
    const followers = user.followers;
    res.status(200).json({ status: "success", results: user.following.length, data: { followers } });
});
exports.getFollowing = catchAsync(async (req, res, next) => {
    const user = await userModel_1.default.findById(req.params.id).populate({
        path: "following",
        options: {
            select: "photo name _id",
            skip: req.query.page ? (parseInt(req.query.page, 10) - 1) * 10 : 0,
            limit: 10,
        },
    });
    if (!user)
        return next(new AppError_1.default(`There is no userfound with that id`, 404));
    const following = user.following;
    res.status(200).json({ status: "success", results: user.following.length, data: { following } });
});
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
exports.becauseYouFollowed = catchAsync(async (req, res, next) => {
    const user = await userModel_1.default.findById(req.user);
    const quizzesPromises = user.following.map(async (followedUser) => {
        if (followedUser !== req.user) {
            const followedUserData = await userModel_1.default.findById(followedUser).populate("quizzes");
            return followedUserData.quizzes.filter((quiz) => quiz.published === true);
        }
    });
    const quizzesArrays = await Promise.all(quizzesPromises);
    const quizzes = quizzesArrays.flat();
    const shuffledQuizzes = shuffleArray(quizzes);
    const suggestedQuizzes = shuffledQuizzes.slice(0, 10);
    console.log(quizzes, quizzesArrays);
    res.status(200).json({ status: "success", data: { results: suggestedQuizzes.length, suggestedQuizzes } });
});
const userFactory = new handlerFactory_1.default(userModel_1.default, "user");
exports.getAllUsers = userFactory.getAll();
exports.updateUser = userFactory.updateOne();
exports.deleteUser = userFactory.deleteOne();
