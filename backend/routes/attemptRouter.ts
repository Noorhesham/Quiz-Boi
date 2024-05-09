import express from "express";
const attemptController = require("../controllers/attemptController");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });

router.route("/").get(attemptController.getAllAttempts)
router
  .route("/:id").get(attemptController.getAttempt)

router.get("/user/stats/:id",attemptController.getUserAttemptStats)
module.exports = router;
