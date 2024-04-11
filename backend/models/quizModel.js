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
const slugify = require("slugify");
const quizSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "quiz must have a title"],
        trim: true,
        maxlength: [40, "Name of quiz is too long"],
        minlength: [4, "Name of quiz is too short"],
    },
    coverImage: { type: String, default: `quiz${Math.trunc(Math.random() * 5) + 1}.png` },
    createdAt: { type: Date, default: Date.now() },
    tags: { type: [String], minlength: [1, "Provide at least one topic to the quiz"] },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    questionNum: {
        type: Number,
    },
    questions: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Question",
        required: true,
    },
    duration: { type: Number },
    usersAttempted: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "UserAttempt" }],
    published: { type: Boolean, default: false },
    color: { type: String, default: "purple" },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
quizSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    this.numberOfQuestions = this.questions.length;
    next();
});
quizSchema.virtual("comments", {
    ref: "Comments",
    foreignField: "quizId",
    localField: "_id",
});
quizSchema.virtual("likes", {
    ref: "Likes",
    localField: "_id",
    foreignField: "quiz",
});
quizSchema.pre(/^find/, function (next) {
    this.populate({
        path: "likes",
    })
        .populate({
        path: "author",
        select: "name id _id photo",
    })
        .populate({
        path: "comments",
        select: "content user ",
    });
    next();
});
quizSchema.pre("findOne", function (next) {
    this.populate({
        path: "usersAttempted",
        select: "-__v ",
    });
    next();
});
const Quiz = mongoose_1.default.model("Quiz", quizSchema);
exports.default = Quiz;
