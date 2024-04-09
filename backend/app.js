"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppError_1 = __importDefault(require("./utils/AppError"));
const userRouter = require("./routes/userRouter");
const quizRouter = require("./routes/quizRouter");
const questionRouter = require("./routes/questionRouter");
const commentsRouter = require("./routes/commentsRouter");
const attemptRouter = require("./routes/attemptRouter");
const tagsRouter = require("./routes/tagsRouter");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express_1.default.static(`${__dirname}/public`));
app.use(cors({ origin: "http://localhost:3001", methods: "GET,POST,PUT,DELETE" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/attempts", attemptRouter);
app.use("/api/v1/tags", tagsRouter);
app.all("*", (err, req, res, next) => {
    next(new AppError_1.default(`cant find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
