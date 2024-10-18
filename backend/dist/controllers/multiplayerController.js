"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multiplayerModel_1 = __importDefault(require("../models/multiplayerModel"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const catchAsync = require("../utils/catchError");
exports.getGame = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield multiplayerModel_1.default.findOne({ sessionId: req.params.id });
    if (!game) {
        return next(new AppError_1.default(`There is no game found with that id`, 404));
    }
    res.status(200).json({ status: "success", data: { game } });
}));
const gamefactory = new handlerFactory_1.default(multiplayerModel_1.default, "game");
exports.getAllGames = gamefactory.getAll();
exports.createGame = gamefactory.createOne();
exports.updateGame = gamefactory.updateOne();
//# sourceMappingURL=multiplayerController.js.map