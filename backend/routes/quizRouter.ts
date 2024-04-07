import express from "express";
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");
const questionRouter = require("./questionRouter");
const commentsRouter = require("./commentsRouter");

const router = express.Router();

router.use("/:quizId/comments", commentsRouter);
router.use("/:quizId/question", questionRouter);
router
  .route("/:quizId/publish")
  .patch(authController.protect, quizController.checkIfAuthor, quizController.publishQuiz);

router
  .route("/")
  .get(quizController.getAllQuizes)
  .post(
    authController.protect,
    quizController.upload,
    quizController.resizeQuizPhoto,
    quizController.addAuthor,
    quizController.uploadQuiz
  );

router.post("/:quizId/completed", quizController.completeQuiz);
router.get("/:quizId/solve", quizController.solveQuiz);
router
  .route("/:quizId/like")
  .post(authController.protect, quizController.likeQuiz)
  .delete(authController.protect, quizController.unLikeQuiz);
router
  .route("/:id")
  .get(authController.protect, quizController.checkIfAuthor, quizController.getQuiz)
  .patch(
    authController.protect,
    quizController.upload,
    quizController.resizeQuizPhoto,
    quizController.checkIfAuthor,
    quizController.updateQuiz
  )
  .delete(authController.protect, quizController.checkIfAuthor, quizController.deleteQuiz);

module.exports = router;
