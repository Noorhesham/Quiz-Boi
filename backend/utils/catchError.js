"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
