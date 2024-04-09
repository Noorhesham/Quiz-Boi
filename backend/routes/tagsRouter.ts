import express from "express";
const userController = require("../controllers/userController");
const tagController = require("../controllers/tagController");


const router = express.Router();
router.get("/", tagController.getQuizTags).post("/", userController.upload, userController.resizeQuizPhoto, tagController.postTags);

module.exports = router;
