import express from "express";
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");
const questionsController = require("../controllers/questionsController");
const commentsRouter = require("./commentsRouter");

const router = express.Router();

router.use("/:quizId/comments", commentsRouter);
const singleQuiz = router.route("/:id");

router
  .route("/")
  .get(quizController.getAllQuizes)
  .post(authController.protect, quizController.addAuthor, quizController.uploadQuiz);

router.post("/:quizId/completed", quizController.completeQuiz);
singleQuiz.get(quizController.getQuiz);

router.use(authController.protect);
router.route("/:quizId/question").post(quizController.checkIfAuthor, questionsController.addQuestionToQuiz);
router
  .route("/:quizId/question/:questionId")
  .delete(quizController.checkIfAuthor, questionsController.deleteQuestionFromQuiz)
  .patch(quizController.checkIfAuthor, questionsController.editQuestionFromQuiz);

router.route("/:quizId/like").post(quizController.likeQuiz).delete(quizController.unLikeQuiz);
singleQuiz
  .patch(quizController.checkIfAuthor, quizController.updateQuiz)
  .delete(quizController.checkIfAuthor, quizController.deleteQuiz);

module.exports = router;
