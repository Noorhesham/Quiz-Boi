import express from "express";
const authController = require("../controllers/authController");
const mapController = require("../controllers/mapController");
const quizRouter = require("./quizRouter");

const router = express.Router();

router.use("/:quizId/quiz", quizRouter);
router
  .route("/")
  .get(mapController.getAllMaps)
  .post(authController.protect, mapController.upload, mapController.resizeMapPhoto, mapController.createMap);
router.route("/positions/:id").post(authController.protect, mapController.updatePositions);
router
  .route("/:id")
  .get(mapController.getMap)
  .patch(authController.protect, mapController.upload, mapController.resizeMapPhoto, mapController.updateMap)
  .delete(authController.protect, mapController.checkIfAuthor, mapController.deleteMap);

module.exports = router;
