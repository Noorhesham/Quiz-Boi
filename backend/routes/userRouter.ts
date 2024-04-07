import express from "express";
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.uploadUserPhoto,userController.resizeUserPhoto, userController.updateMe);
router.post("/userId/follow", userController.followUser);
router.post("/userId/unfollow", userController.unfollowUser);
router.get("/:id", userController.getUser);
module.exports = router;
