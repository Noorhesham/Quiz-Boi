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
const userAttemptSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return !this.username;
        },
    },
    quizId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    username: {
        type: String,
        required: function () {
            return !this.userId;
        },
    },
    answers: { type: [{ answer: Number, id: mongoose_1.Schema.Types.ObjectId, duration: Number }], required: true },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    isPublic: { type: Boolean, default: true },
    totalPoints: { type: Number },
    percentage: { type: Number },
    attemptedAt: { type: Date, default: new Date(Date.now()) },
    sessionId: { type: String },
});
const UserAttempt = mongoose_1.default.model("UserAttempt", userAttemptSchema);
exports.default = UserAttempt;
//# sourceMappingURL=userAttemptsModel.js.map