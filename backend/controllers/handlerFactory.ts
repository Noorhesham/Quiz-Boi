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
      console.log(newDoc);
      res.status(200).json({ status: "success", data: { [this.name]: newDoc } });
    });
  getAll = (popOptions?: any, select?: string, filter?: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      let filters = {};
      if (req.params.quizId) filters = { quizId: req.params.quizId, ...filter };
      let query = this.Model.find(filters);
      if (popOptions) query.populate(popOptions);
      if (select) query.select(select);
      const totalDocsQuery = this.Model.find(filters).countDocuments();
      const { query: paginatedQuery, queryString } = new ApiFeatures(query, req.query)
        .filter()
        .paginate()
        .sort()
        .limitFields();
      const docs = await paginatedQuery;
      console.log("mewowow", docs);

      // Execute the query to get the total count of documents
      const totalResults = await totalDocsQuery;

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalResults / (queryString.limit || 10));
      if (!docs) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res
        .status(200)
        .json({ status: "success", results: docs.length, totalPages, totalResults, data: { [this.name]: docs } });
    });

  getOne = (id = "id", popOptions?: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      let query = this.Model.findById(req.params?.[id]);
      popOptions && query.populate(popOptions);
      const doc = await query;
      if (!doc) return next(new AppError(`There is no ${this.name} found with that id`, 404));
      res.status(200).json({ status: "success", data: { [this.name.toLowerCase()]: doc } });
    });
  updateOne = (popOptions?: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.params);
      let query = this.Model.findByIdAndUpdate(req.params.id || req.params.quizId, req.body, {
        runValidators: true,
        new: true,
      });
      popOptions && query.populate(popOptions);
      const editedDoc = await query;
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
