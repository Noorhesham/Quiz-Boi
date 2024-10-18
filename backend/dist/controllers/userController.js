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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const toggleUserIdPopulation = require("../models/userAttemptsModel");
const togglePopulateLikesCommentsAuthor = require("../models/quizModel");
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
exports.resizeQuizPhoto = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, req.file);
    if (!req.file)
        return next();
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = yield cloudinary_1.default.uploader.upload(dataURI, {
        resource_type: "auto",
    });
    console.log(cldRes.secure_url);
    req.body.photo = cldRes.secure_url;
    next();
}));
const filteredObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => allowedFields.includes(key) && (newObj[key] = obj[key]));
    //create a new field in the new object which value is the value of that field in the old object
    //this applies only if that field in allowed in the arr
    return newObj;
};
exports.getDetails = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.default.findById(req.params.id).populate({
        path: "quizzes",
        select: `-questions -usersAttempted `,
        populate: [
            {
                path: "comments",
            },
        ],
    });
    if (!user)
        return next(new AppError_1.default("cannot find this user", 404));
    if (!user.public) {
        const _a = user.toObject(), { quizzes } = _a, userPrivate = __rest(_a, ["quizzes"]);
        user = Object.assign({}, userPrivate);
    }
    res.status(200).json({ status: "success", data: { user } });
}));
exports.getLikedQuizzes = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (+page - 1) * +limit;
    const [user, totalLikedQuizzes] = yield Promise.all([
        userModel_1.default.findById(req.params.id).populate({
            path: "likedQuizzes",
            populate: {
                path: "quiz",
                select: "-usersAttempted -user  -questions",
                populate: [
                    {
                        path: "author",
                        select: "name photo id _id followingCount quizzes followersCount",
                    },
                    {
                        path: "comments",
                    },
                ],
            },
            options: { skip, limit },
        }),
        userModel_1.default.findById(req.params.id)
            .populate("likedQuizzes")
            .lean()
            .then((user) => (user === null || user === void 0 ? void 0 : user.likedQuizzes.length) || 0),
    ]);
    if (!user)
        return next(new AppError_1.default("cannot find this user", 404));
    // if (!user.public && !req.user) return next(new AppError(`This Account is private ..`, 404));
    const { likedQuizzes } = user;
    res.status(200).json({
        status: "success",
        data: { likedQuizzes, totalLikedQuizzes, totalPages: Math.ceil(totalLikedQuizzes / +limit) },
    });
}));
exports.getPlayedQuizzes = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (+page - 1) * +limit;
    const [user, totalAttemptedQuizzes] = yield Promise.all([
        userModel_1.default.findById(req.params.id).populate({
            path: "attemptedQuizzes",
            match: req.user ? {} : { isPublic: { $ne: false } },
            select: "-answers",
            populate: {
                path: "quizId",
                select: "-questions -usersAttempted",
                populate: [
                    {
                        path: "author",
                        select: "name photo id _id followingCount quizzes followersCount",
                    },
                    {
                        path: "comments",
                    },
                ],
            },
            options: { skip, limit },
        }),
        userModel_1.default.findById(req.params.id)
            .populate("attemptedQuizzes")
            .lean()
            .then((user) => (user === null || user === void 0 ? void 0 : user.attemptedQuizzes.length) || 0),
    ]);
    if (!user)
        return next(new AppError_1.default("cannot find this user", 404));
    if (!user.public && !req.user)
        return next(new AppError_1.default(`This Account is private ..`, 404));
    const { attemptedQuizzes } = user;
    res.status(200).json({
        status: "success",
        data: { attemptedQuizzes, totalAttemptedQuizzes, totalPages: Math.ceil(totalAttemptedQuizzes / +limit) },
    });
}));
exports.getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.params.id = req.user.id;
    next();
});
exports.getUserMini = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (!user)
        return next(new AppError_1.default(`There is no userfound with that id`, 404));
    res.status(200).json({ status: "success", data: { user } });
}));
exports.getUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.default.findById(req.params.id).populate({ path: "likedQuizzes", select: "quiz -user -_id" });
    // .populate({ path: "attemptedQuizzes" ,select:"-answers quizId _id"});
    if (!user)
        return next(new AppError_1.default(`There is no user found with that id`, 404));
    if (!user.public) {
        const _a = user.toObject(), { quizzes } = _a, userPrivate = __rest(_a, ["quizzes"]);
        user = Object.assign({}, userPrivate);
    }
    res.status(200).json({ status: "success", data: { user } });
}));
exports.updateMe = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, req.file);
    if (req.body.password || req.body.passwordConfirm)
        return next(new AppError_1.default("you cannot update password in this route", 400));
    //2)update user doc
    const updatedData = filteredObj(req.body, "name", "email", "photo", "public");
    const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.user.id, updatedData, {
        new: true,
        runValidators: true,
    });
    console.log(updatedUser, updatedData);
    res.status(200).json({ status: "success", data: updatedUser });
}));
exports.followUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.user;
    const userToFollow = yield userModel_1.default.findById(req.params.id);
    console.log(currentUser, userToFollow);
    if (currentUser._id === userToFollow._id)
        return next(new AppError_1.default("You  Cannot follow yourself !", 404));
    if (!userToFollow)
        return next(new AppError_1.default("cannot find this user", 400));
    if (currentUser.following.includes(req.params.id))
        return next(new AppError_1.default("You are already following this user.", 400));
    if (!userToFollow.public) {
        // If the account is not public, send a follow request instead
        if (!currentUser.followRequests.includes(userToFollow._id)) {
            currentUser.followRequests.push(userToFollow._id);
            userToFollow.receivedRequests.push(currentUser._id);
            yield Promise.all([currentUser.save(), userToFollow.save()]);
        }
        return res.status(200).json({ status: "success", message: "Follow request sent." });
    }
    currentUser.following.push(req.params.id);
    userToFollow.followers.push(currentUser._id);
    yield Promise.all([currentUser.save(), userToFollow.save()]);
    res.status(200).json({ status: "success", data: { currentUser } });
}));
exports.unfollowUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const currentUser = req.user;
    if (!currentUser.following.includes(id))
        return next(new AppError_1.default("You are not following this user.", 400));
    currentUser.following = currentUser.following.filter((id) => id.toString() !== req.params.id);
    yield currentUser.save();
    const followedUser = yield userModel_1.default.findById(id);
    followedUser.followers = followedUser.followers.filter((id) => id.toString() !== currentUser._id.toString());
    yield followedUser.save();
    res.status(200).json({ message: "Successfully unfollowed user." });
}));
exports.getFollowers = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id).populate({
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
}));
exports.getFollowing = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id).populate({
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
}));
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
exports.becauseYouFollowed = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user);
    const quizzesPromises = user.following.map((followedUser) => __awaiter(void 0, void 0, void 0, function* () {
        if (followedUser !== req.user) {
            const followedUserData = yield userModel_1.default.findById(followedUser).populate({
                path: "quizzes",
                populate: [
                    {
                        path: "author",
                        select: "name photo id _id followingCount quizzes followersCount",
                    },
                    {
                        path: "comments",
                    },
                ],
            });
            return followedUserData.quizzes.filter((quiz) => quiz.published === true);
        }
    }));
    const quizzesArrays = yield Promise.all(quizzesPromises);
    const quizzes = quizzesArrays.flat();
    const shuffledQuizzes = shuffleArray(quizzes);
    const suggestedQuizzes = shuffledQuizzes.slice(0, 10);
    console.log(quizzes, quizzesArrays);
    res.status(200).json({ status: "success", data: { results: suggestedQuizzes.length, suggestedQuizzes } });
}));
exports.topAuthors = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find()
        .select("-followers -following")
        .populate({ path: "quizzes", select: "-questions -usersAttempted  -likes" });
    console.log(users);
    const sortedUsers = users.sort((a, b) => {
        const publishedQuizzesCountA = a.quizzes.filter((q) => q.published).length;
        const publishedQuizzesCountB = b.quizzes.filter((q) => q.published).length;
        return publishedQuizzesCountB - publishedQuizzesCountA;
    });
    const topAuthors = sortedUsers.slice(0, 10).map((user) => {
        const _a = user.toObject(), { quizzes } = _a, userWithoutQuizzes = __rest(_a, ["quizzes"]);
        return userWithoutQuizzes;
    });
    res.status(200).json({ status: "success", data: { results: topAuthors.length, topAuthors } });
}));
exports.searchUsers = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (+page - 1) * +limit;
    const q = req.query.q;
    const users = yield userModel_1.default.find({
        $or: [{ name: { $regex: new RegExp(q, "i") } }, { email: { $regex: new RegExp(q, "i") } }],
    })
        .skip(skip)
        .limit(+limit);
    res.status(200).json({ status: "success", data: { results: users.length, users } });
}));
const userFactory = new handlerFactory_1.default(userModel_1.default, "user");
exports.getAllUsers = userFactory.getAll();
exports.updateUser = userFactory.updateOne();
exports.deleteUser = userFactory.deleteOne();
//# sourceMappingURL=userController.js.map