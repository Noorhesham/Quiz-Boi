import express, { NextFunction, Request, Response } from "express";
import AppError from "./utils/AppError";
const userRouter = require("./routes/userRouter");
const quizRouter = require("./routes/quizRouter");
const commentsRouter = require("./routes/commentsRouter");
const questionRouter = require("./routes/questionRouter");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(cors({ origin: "http://localhost:3001", methods: "GET,POST,PUT,DELETE" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/comments", commentsRouter);

app.all("*", (err: any, req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
