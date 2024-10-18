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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const util_1 = require("util");
const userModel_1 = __importDefault(require("../models/userModel"));
const axios = require("axios");
const catchAsync = require("../utils/catchError");
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
    //generate a jwt that takes the id of user as payload , secret ,expirey date
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const sendResponse = (res, user, code) => {
    const token = generateToken(user._id);
    const cookieExpiresIn = process.env.COOKIE_EXPIRES_IN;
    if (!cookieExpiresIn)
        throw new Error("Environment variable COOKIE_EXPIRES_IN is not defined.");
    const cookieOptions = {
        expires: new Date(Date.now() + parseInt(cookieExpiresIn) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production ")
        cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;
    res.status(code).json({ status: "success", token, data: { user } });
};
exports.signup = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;
        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${googleAccessToken}`,
            },
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;
            const picture = response.data.picture;
            const isthirdParty = true;
            const existingUser = yield userModel_1.default.findOne({ email });
            if (existingUser)
                return next(new AppError_1.default("User already exist!", 400));
            console.log(googleAccessToken, response);
            const result = yield userModel_1.default.create({ email, name: `${firstName} ${lastName}`, photo: picture, isthirdParty });
            console.log(result, response);
            sendResponse(res, result, 201);
        }))
            .catch((err) => {
            console.log(err);
            return next(new AppError_1.default("invalid token!", 400));
        });
    }
    else {
        const newUser = yield userModel_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangeAt: req.body.passwordChangeAt,
            role: req.body.role,
            public: req.body.public
        });
        sendResponse(res, newUser, 201);
    }
}));
exports.login = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;
        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${googleAccessToken}`,
            },
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;
            const picture = response.data.picture;
            const existingUser = yield userModel_1.default.findOne({ email });
            if (!existingUser)
                return next(new AppError_1.default("User dont exist!", 404));
            console.log(existingUser);
            sendResponse(res, existingUser, 201);
        }))
            .catch(() => next(new AppError_1.default("invalid token!", 400)));
    }
    else {
        const { password, email } = req.body;
        if (!password || !email)
            return next(new AppError_1.default("Please provide email and password", 400));
        const user = yield userModel_1.default.findOne({ email }).select("+password");
        if (!user || !(yield user.correctPassword(password)))
            return next(new AppError_1.default("Email or Password are not correct", 401));
        sendResponse(res, user, 200);
    }
}));
exports.logout = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
}));
exports.protect = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let token;
    if (req.headers.authorization && ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer"))) {
        token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    }
    else if (req.cookies.jwt && req.cookies.jwt === "jwt") {
        token = req.cookies.jwt;
    }
    if (!token)
        return next(new AppError_1.default("You are not logged in ..", 401));
    const decoded = yield (0, util_1.promisify)(jwt.verify)(token, process.env.JWT_SECRET); //verify the token
    const user = yield userModel_1.default.findById(decoded.id);
    if (!user)
        return next(new AppError_1.default("user no longer exists ", 401));
    if (user.changedPasswordAfter(decoded.iat))
        return next(new AppError_1.default("User recently changed his password ! please login again...", 401));
    req.user = user;
    next();
}));
exports.restrictTo = (...roles) => {
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!roles.includes(req.user.role))
            return next(new AppError_1.default("you do not have permission to perform this action", 403));
        next();
    });
};
exports.forgetPassword = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield userModel_1.default.findOne({ email });
}));
exports.updatePassword = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { passwordCurrent, password, passwordConfirm } = req.body;
    //1)get user from collection
    const user = yield userModel_1.default.findById(req.user.id).select("+password");
    //2)posted password is correct
    if (!(yield user.correctPassword(passwordCurrent)))
        return next(new AppError_1.default("password is not correct", 401));
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    yield user.save();
    //3)log the user in
    sendResponse(res, user, 200);
}));
//# sourceMappingURL=authController.js.map