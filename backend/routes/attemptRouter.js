"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attemptController = require("../controllers/attemptController");
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");
const router = express_1.default.Router({ mergeParams: true });
router.route("/").get(attemptController.getAllAttempts);
router.route("/:id").get(attemptController.getAttempt);
router.get("/user/stats/:id", attemptController.getUserAttemptStats);
router.use(authController.protect);
router.route('/:id').patch(attemptController.checkIfAuthor, attemptController.updateAttempt);
module.exports = router;
