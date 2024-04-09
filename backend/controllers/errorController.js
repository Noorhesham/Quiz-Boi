"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name;
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    console.log(errors);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError_1.default(message, 400);
};
const handleJWTError = () => new AppError_1.default('Invalid token,login again', 401);
const handleJWTExpiredError = () => new AppError_1.default('Token expired!please login again..', 401);
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
        // Programming or other unknown error: don't leak error details
    }
    else {
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};
module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production ') {
        //if we are in production mode then we want to send clean and good errors to the client so
        //we start by making custome messages for each error type and we check if this error operational means that it is from the AppError class
        //then we send messages that describe this error if not then we send generic message that hides the details of that error cause it will
        //be an error that is related to our development tools libraries .. etc ...
        let error = { ...err };
        error.message = error.message;
        console.log(error);
        if (error.name === 'CastError')
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error._message === 'Tour validation failed')
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
};
