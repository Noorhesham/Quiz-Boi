import express from "express";
const attemptController = require("../controllers/attemptController");
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");

const router = express.Router({ mergeParams: true });
router.route("/").get(attemptController.getAllAttempts);
router.route("/:id").get(attemptController.getAttempt);

router.get("/user/stats/:id", attemptController.getUserAttemptStats);
router.use(authController.protect)
router.route('/:id').patch(attemptController.checkIfAuthor,attemptController.updateAttempt)
module.exports = router;
