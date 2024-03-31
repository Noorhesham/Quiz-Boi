import express from "express";
const authController = require("../controllers/authController");
const commentsConroller = require("../controllers/commentsController");

//i want to be able to use comments either by quizId/comments or /comments as a single route
const router = express.Router({ mergeParams: true });

router.route("/").get(commentsConroller.getAllComments).post(authController.protect, commentsConroller.addComment);
router.use(authController.protect);
router
  .route("/:id")
  .patch(commentsConroller.checkIfAuthor, commentsConroller.editComment)
  .delete(commentsConroller.checkIfAuthor, commentsConroller.deleteComment);

module.exports = router;
