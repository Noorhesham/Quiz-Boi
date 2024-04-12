import express from "express";
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.route("/public/:id").get( userController.getDetails);
router.route("/public-mini/:id").get( userController.getuser);
router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser);
router.get("/me-details", userController.getMe, userController.getDetails);
router.patch("/updateMe", userController.upload,userController.resizeQuizPhoto, userController.updateMe);
router.patch('/updateMyPassword',authController.protect, authController.updatePassword); //token + new password
router.post("/:id/follow",authController.protect, userController.followUser);
router.post("/:id/unfollow",authController.protect, userController.unfollowUser);
module.exports = router;
