"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");
const questionRouter = require("./questionRouter");
const commentsRouter = require("./commentsRouter");
const attemptRouter = require("./attemptRouter");
const router = express_1.default.Router();
router.use("/:quizId/comments", commentsRouter);
router.use("/:quizId/attempts", attemptRouter);
router.use("/:quizId/question", questionRouter);
router
    .route("/")
    .get(quizController.getAllQuizes)
    .post(authController.protect, quizController.upload, quizController.resizeQuizPhoto, quizController.addAuthor, quizController.uploadQuiz);
router
    .route("/:quizId/publish")
    .patch(authController.protect, quizController.checkIfAuthor, quizController.publishQuiz);
router.post("/:quizId/completed", quizController.completeQuiz);
router.get("/:quizId/solve", quizController.solveQuiz);
router
    .route("/:quizId/like")
    .post(authController.protect, quizController.likeQuiz)
    .delete(authController.protect, quizController.unLikeQuiz);
router
    .route("/:id")
    .get(authController.protect, quizController.checkIfAuthor, quizController.getQuiz)
    .patch(authController.protect, quizController.upload, quizController.resizeQuizPhoto, quizController.checkIfAuthor, quizController.updateQuiz)
    .delete(authController.protect, quizController.checkIfAuthor, quizController.deleteQuiz);
router.route("/:id/public").get(quizController.getQuiz);
module.exports = router;
