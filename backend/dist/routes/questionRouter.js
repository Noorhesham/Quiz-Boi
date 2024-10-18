"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");
const questionsController = require("../controllers/questionsController");
const router = express_1.default.Router({ mergeParams: true });
router
    .route("/")
    .get(questionsController.getAllQuestions)
    .post(authController.protect, quizController.checkIfAuthor, questionsController.upload, questionsController.resizeQuizPhoto, questionsController.addQuestionToQuiz);
router
    .route("/:questionId")
    .get(questionsController.getQuestion)
    .delete(authController.protect, quizController.checkIfAuthor, questionsController.deleteQuestionFromQuiz)
    .patch(authController.protect, quizController.checkIfAuthor, questionsController.upload, questionsController.resizeQuizPhoto, questionsController.editQuestionFromQuiz);
module.exports = router;
//# sourceMappingURL=questionRouter.js.map