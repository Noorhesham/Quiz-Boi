"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multiplayerController = require("../controllers/multiplayerController");
const router = express_1.default.Router();
router
    .route("/")
    .post(multiplayerController.createGame)
    .patch(multiplayerController.updateGame)
    .get(multiplayerController.getAllGames);
router.route("/:id").get(multiplayerController.getGame);
module.exports = router;
//# sourceMappingURL=multiplayerRouter.js.map