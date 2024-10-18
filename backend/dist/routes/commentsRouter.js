"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = require("../controllers/authController");
const commentsConroller = require("../controllers/commentsController");
//i want to be able to use comments either by quizId/comments or /comments as a single route
const router = express_1.default.Router({ mergeParams: true });
router.route("/").get(commentsConroller.getAllComments).post(authController.protect, commentsConroller.addComment);
router.use(authController.protect);
router
    .route("/:id")
    .patch(commentsConroller.checkIfAuthor, commentsConroller.editComment)
    .delete(commentsConroller.checkIfAuthor, commentsConroller.deleteComment);
module.exports = router;
//# sourceMappingURL=commentsRouter.js.map