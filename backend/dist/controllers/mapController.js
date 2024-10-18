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
exports.updatePositions = exports.checkIfAuthor = exports.deleteMap = exports.getMap = exports.getAllMaps = exports.updateMap = exports.createMap = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const mapModel_1 = __importDefault(require("../models/mapModel"));
const multer_1 = __importDefault(require("multer"));
const catchAsync = require("../utils/catchError");
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.default("Not an image", 400), false);
    }
};
const upload = (0, multer_1.default)({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.upload = upload.single("mapImage");
exports.resizeMapPhoto = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, req.file);
    if (!req.file)
        return next();
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = yield cloudinary_1.default.uploader.upload(dataURI, {
        resource_type: "auto",
    });
    console.log(cldRes.secure_url);
    req.body.mapImage = cldRes.secure_url;
    next();
}));
exports.createMap = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, levels, author, mapImage } = req.body;
    console.log(req.body, req.file);
    const map = yield mapModel_1.default.create({ name, levels, author: req.user.id, mapImage });
    res.status(201).json({
        status: "success",
        data: { map },
    });
}));
const MapFactory = new handlerFactory_1.default(mapModel_1.default, "map");
exports.updateMap = MapFactory.updateOne();
exports.getAllMaps = MapFactory.getAll();
exports.getMap = MapFactory.getOne();
exports.deleteMap = MapFactory.deleteOne();
exports.checkIfAuthor = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield mapModel_1.default.findById(req.params.id);
    if (!map || map.author.toString() !== req.user.id) {
        return next(new AppError_1.default(`You are not authorized to perform this action`, 403));
    }
    next();
}));
exports.updatePositions = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield mapModel_1.default.findById(req.params.id);
    if (!map)
        return next(new AppError_1.default(`There is no map found with that id`, 404));
    // Iterate over the incoming levels from the request body
    const incomingLevels = req.body;
    console.log("Incoming Levels:", incomingLevels);
    console.log("Existing Map Levels:", map.levels);
    incomingLevels.forEach((incomingLevel) => {
        const index = map.levels.findIndex((existingLevel) => String(existingLevel.quizId.id) === String(incomingLevel.quizId));
        console.log("Index found:", index, map.levels[index]);
        if (index !== -1) {
            // Update position if the quizId matches
            map.levels[index].position = incomingLevel.position;
        }
    });
    // Save the updated map
    yield map.save();
    res.status(200).json({ status: "success", data: { map } });
}));
//# sourceMappingURL=mapController.js.map