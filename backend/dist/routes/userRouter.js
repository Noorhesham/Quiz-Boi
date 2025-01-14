"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.route("/public/:id").get(userController.getDetails);
router.route("/public/:id/liked").get(userController.getLikedQuizzes);
router.route("/public/:id/played").get(userController.getPlayedQuizzes);
router.route("/public/:id/followers").get(userController.getFollowers);
router.route("/public/:id/following").get(userController.getFollowing);
router.route("/public-mini/:id").get(userController.getUserMini);
router.route("/top-authors").get(userController.topAuthors);
router.route("/search").get(userController.searchUsers);
router.route("/all").get(userController.getAllUsers);
router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser);
router.get("/me-liked", userController.getMe, userController.getLikedQuizzes);
router.get("/me-attempted", userController.getMe, userController.getPlayedQuizzes);
router.get("/me-details", userController.getMe, userController.getDetails);
router.patch("/updateMe", userController.upload, userController.resizeQuizPhoto, userController.updateMe);
router.patch("/updateMyPassword", authController.protect, authController.updatePassword); //token + new password
router.post("/:id/follow", authController.protect, userController.followUser);
router.post("/:id/unfollow", authController.protect, userController.unfollowUser);
router.get("/suggessions", authController.protect, userController.becauseYouFollowed);
module.exports = router;
//# sourceMappingURL=userRouter.js.map