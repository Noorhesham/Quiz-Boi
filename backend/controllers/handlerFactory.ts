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
      console.log(req.body);
      const newDoc = await this.Model.create(req.body);
      res.status(200).json({ status: "success", data: { [this.name]: newDoc } });
    });
  getAll = (popOptions?: any,select?:string) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      let filters = {};
      if (req.params.quizId) filters = { quizId: req.params.quizId };
      let query = this.Model.find(filters);
      if (popOptions) query.populate(popOptions)
      if(select) query.select(select);
      const docs = await new ApiFeatures(query, req.query).filter().paginate().sort().limitFields().query;
      if (!docs) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res.status(200).json({ status: "success", results: docs.length, data: { [this.name]: docs } });
    });

  getOne = (id = "id", popOptions?: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      let query = this.Model.findById(req.params?.[id]);
      popOptions && query.populate(popOptions);
      const doc = await query;
      if (!doc) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res.status(200).json({ status: "success", data: { [this.name.toLowerCase()]: doc } });
    });
  updateOne = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.params);
      const editedDoc = await this.Model.findByIdAndUpdate(req.params.id || req.params.quizId, req.body, {
        runValidators: true,
        new: true,
      });
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
