import express from "express";
const multiplayerController = require("../controllers/multiplayerController");

const router = express.Router();
router
  .route("/")
  .post(multiplayerController.createGame)
  .patch(multiplayerController.updateGame)
  .get(multiplayerController.getAllGames);
router.route("/:id").get(multiplayerController.getGame);

module.exports = router;
