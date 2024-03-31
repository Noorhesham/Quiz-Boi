import express from "express";
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authController.protect,userController.getMe,userController.getUser);
router.get("/:id", userController.getUser);
module.exports = router;
