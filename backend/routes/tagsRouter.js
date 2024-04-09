"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = require("../controllers/userController");
const tagController = require("../controllers/tagController");
const router = express_1.default.Router();
router.get("/", tagController.getQuizTags).post("/", userController.upload, userController.resizeQuizPhoto, tagController.postTags);
module.exports = router;
