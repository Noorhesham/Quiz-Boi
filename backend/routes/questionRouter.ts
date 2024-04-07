import express from "express";
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");
const questionsController = require("../controllers/questionsController");
const router = express.Router({ mergeParams: true });

router
  .route("")
  .get(questionsController.getAllQuestions)
  .post(
    authController.protect,
    quizController.checkIfAuthor,
    questionsController.upload,
    questionsController.resizeQuizPhoto,
    questionsController.addQuestionToQuiz
  );
router.use(authController.protect);
router
  .route("/:questionId")
  .get(questionsController.getQuestion)
  .delete(quizController.checkIfAuthor, questionsController.deleteQuestionFromQuiz)
  .patch(
    quizController.checkIfAuthor,
    questionsController.upload,
    questionsController.resizeQuizPhoto,
    questionsController.editQuestionFromQuiz
  );

module.exports = router;
