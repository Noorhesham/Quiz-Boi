import { NextFunction, Request, Response } from "express";

module.exports = (fn:any) => {
    return (req:Response, res:Request, next:NextFunction) => {
      fn(req, res, next).catch(next);
    };
  };
  