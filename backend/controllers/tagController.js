"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = require("../utils/catchError");
const TagModel_1 = __importDefault(require("../models/TagModel"));
exports.getQuizTags = catchAsync(async (req, res, next) => {
    const tags = await TagModel_1.default.find();
    res.status(200).json({
        status: 'success',
        data: {
            tags
        }
    });
});
exports.postTags = catchAsync(async (req, res, next) => {
    const tag = await TagModel_1.default.create(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            tag
        }
    });
});
