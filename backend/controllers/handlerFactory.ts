import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { Model, Document } from "mongoose";
import ApiFeatures from "../utils/ApiFeatures";
const catchAsync = require("../utils/catchError");

class Factory {
  Model: Model<Document | any>;
  name: string;
  constructor(Model: Model<Document | any>, name: string) {
    this.Model = Model;
    this.name = name;
  }
  createOne = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const newDoc = await this.Model.create(req.body);
      res.status(200).json({ status: "success", data: { [this.name]: newDoc } });
    });
  getAll = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      let filters = {};
      if (req.params.quizId) filters = { quizId: req.params.quizId };
      const docs = await new ApiFeatures(this.Model.find(filters), req.query).filter().paginate().sort().limitFields()
        .query;
      if (!docs) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res.status(200).json({ status: "success", results: docs.length, data: { [this.name]: docs } });
    });

  getOne = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await this.Model.findById(req.params.id);
      if (!doc) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res.status(200).json({ status: "success", data: { [this.name]: doc } });
    });
  updateOne = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const editedDoc = await this.Model.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
      if (!editedDoc) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res.status(201).json({ status: "success", data: { [this.name]: editedDoc } });
    });
  deleteOne = () =>
    catchAsync(async (req: any, res: Response, next: NextFunction) => {
      const deletedDoc = await this.Model.findByIdAndDelete(req.params.id);
      if (!deletedDoc) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res.status(201).json({ status: "success", data: null });
    });
}
export default Factory;
