import { Request, Response, NextFunction, response } from "express";
import AppError from "../utils/AppError";
import { UserProps } from "../types";
import { promisify } from "util";
import User from "../models/userModel";
const axios = require("axios");
const catchAsync = require("../utils/catchError");
const jwt = require("jsonwebtoken");

const generateToken = (id: String) => {
  //generate a jwt that takes the id of user as payload , secret ,expirey date
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const sendResponse = (res: Response, user: UserProps, code: number) => {
  const token = generateToken(user._id);
  const cookieExpiresIn = process.env.COOKIE_EXPIRES_IN;
  if (!cookieExpiresIn) throw new Error("Environment variable COOKIE_EXPIRES_IN is not defined.");

  const cookieOptions: { expires: Date; httpOnly: boolean; secure?: boolean } = {
    expires: new Date(Date.now() + parseInt(cookieExpiresIn) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production ") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(code).json({ status: "success", token, data: { user } });
};

exports.signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response: any) => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        const picture = response.data.picture;
        const isthirdParty=true
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(new AppError("User already exist!", 400));
        console.log(googleAccessToken, response);
        const result = await User.create({ email, name: `${firstName} ${lastName}`, photo: picture,isthirdParty });
        console.log(result, response);
        sendResponse(res, result, 201);
      })
      .catch((err: any) => {
        console.log(err);
        return next(new AppError("invalid token!", 400));
      });
  } else {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangeAt: req.body.passwordChangeAt,
      role: req.body.role,
    });
    sendResponse(res, newUser, 201);
  }
});

exports.login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response: Response | any) => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        const picture = response.data.picture;
        const existingUser = await User.findOne({ email });
        if (!existingUser) return next(new AppError("User dont exist!", 404));
        console.log(existingUser)
        sendResponse(res, existingUser, 201);
      })
      .catch(() => next(new AppError("invalid token!", 400)));
  } else {
    const { password, email } = req.body;
    if (!password || !email) return next(new AppError("Please provide email and password", 400));
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password)))
      return next(new AppError("Email or Password are not correct", 401));
    sendResponse(res, user, 200);
  }
});

exports.logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

exports.protect = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization?.split(" ")[1];
  } else if (req.cookies.jwt && req.cookies.jwt === "jwt") {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError("You are not logged in ..", 401));
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //verify the token
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("user no longer exists ", 401));
  if (user.changedPasswordAfter(decoded.iat))
    return next(new AppError("User recently changed his password ! please login again...", 401));
  req.user = user;
  next();
});

exports.restrictTo = (...roles: [string]) => {
  async (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("you do not have permission to perform this action", 403));
    next();
  };
};

exports.forgetPassword = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
});
exports.updatePassword = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  console.log(req.body)
  const { passwordCurrent, password, passwordConfirm } = req.body;
  //1)get user from collection
  const user = await User.findById(req.user.id).select("+password");

  //2)posted password is correct
  if (!(await user.correctPassword(passwordCurrent))) return next(new AppError("password is not correct", 401));
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  //3)log the user in
  sendResponse(res, user, 200);
});
