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
const questionSchema = new mongoose_1.Schema({
    quiz: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
        validate: {
            validator: function (val) {
                console.log(this);
                return (val === null || val === void 0 ? void 0 : val.length) > 0; // Ensure at least one answer exists
            },
            message: "At least one answer is required",
        },
    },
    coverImage: { type: String },
    explain: { type: String },
    hint: {
        coverImage: { type: String },
        text: { type: String },
    },
    points: { type: Number, default: 10 },
    correctAnswerIndex: {
        type: Number,
        required: true,
    },
});
// Create and export Question model
const Question = mongoose_1.default.model("Question", questionSchema);
exports.default = Question;
//# sourceMappingURL=questionModel.js.map