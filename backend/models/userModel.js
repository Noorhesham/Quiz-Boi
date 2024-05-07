"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "please tell us your name .."] },
    email: {
        type: String,
        required: [true, "please provide your email .."],
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, "please provide a valid email.."],
    },
    photo: {
        type: String,
        default: `https://res.cloudinary.com/dtmvl9re1/image/upload/v1712582898/i6f0b5jxsbeu1lod336a.jpg`,
    },
    password: {
        type: String,
        minlength: 6,
        select: false,
        validate: {
            validator: function (value) {
                // Skip validation if googleAccessToken is provided
                if (this.googleAccessToken)
                    return true;
                return !!value;
            },
            message: "Please provide your password.",
        },
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (value) {
                if (this.googleAccessToken)
                    return true;
                return value === this.password;
            },
            message: "Passwords do not match.",
        },
    },
    passwordChangeAt: Date,
    role: { type: String, required: true, default: "user" },
    bio: { type: String },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    likedTopics: [String],
    following: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    isthirdParty: { type: Boolean, default: false },
    followers: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
userSchema.pre('save', function (next) {
    // Update followersCount and followingCount before saving
    this.followersCount = this.followers.length;
    this.followingCount = this.following.length;
    next();
});
userSchema.pre("save", async function (next) {
    //makin sure the password is created new or updated cause
    //i wont encrybt it if i updated somethingelse
    if (this.googleAccessToken)
        return next();
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined; //required input =>not required to be persisted in the DB;
    next();
});
//updating the password middleware
userSchema.pre("save", function (next) {
    //i check if the password is not new or is not modified so it means that the password changed /updated
    if (this.googleAccessToken)
        return next();
    if (!this.isModified("password") || this.isNew)
        return next();
    this.passwordChangeAt = Date.now() - 1000;
    next();
});
// userSchema.pre(/^find/, function (this: any, next) {
//   this.find({ active: { $ne: false } });
//   this.populate({ path: "following" }).populate({ path: "followers" });
//   next();
// });
userSchema.pre("findOne", function (next) {
    this.find({ active: { $ne: false } });
    next();
});
userSchema.methods.correctPassword = async function (candidatePassword) {
    //compare the password that the client entered with the encrypted password stored in the DB and return t or f
    return await bcrypt.compare(candidatePassword, this.password); //auto compare of normal pass to the db encrypted one
};
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangeAt) {
        const changedTimeStamp = this.passwordChangeAt.getTime() / 1000;
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
};
userSchema.methods.createPasswordResetToken = function () {
    //we create a reset token which is less secure then we save encrypted this token to the DB along with an expire date
    // we return the original reset token to the user and the saved one is on the DB
    const resetToken = crypto.randomBytes(32).toString("hex"); //not encrypted
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex"); //encrypted version in the DB and we send an email with the original version to the user
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken, this.passwordResetToken);
    return resetToken;
};
userSchema.virtual("quizzes", {
    ref: "Quiz",
    localField: "_id",
    foreignField: "author",
});
userSchema.virtual("likedQuizzes", {
    ref: "Likes",
    localField: "_id",
    foreignField: "user",
});
userSchema.virtual("attemptedQuizzes", {
    ref: "UserAttempt",
    localField: "_id",
    foreignField: "userId",
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
