"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const ApiFeatures_1 = __importDefault(require("../utils/ApiFeatures"));
const catchAsync = require("../utils/catchError");
class Factory {
    constructor(Model, name) {
        this.createOne = () => catchAsync(async (req, res, next) => {
            console.log(req.body);
            const newDoc = await this.Model.create(req.body);
            console.log(newDoc);
            res.status(200).json({ status: "success", data: { [this.name]: newDoc } });
        });
        this.getAll = (popOptions, select) => catchAsync(async (req, res, next) => {
            let filters = {};
            if (req.params.quizId)
                filters = { quizId: req.params.quizId };
            let query = this.Model.find(filters);
            if (popOptions)
                query.populate(popOptions);
            if (select)
                query.select(select);
            const docs = await new ApiFeatures_1.default(query, req.query).filter().paginate().sort().limitFields().query;
            if (!docs)
                return next(new AppError_1.default(`There is no ${this.name} found with that id`, 404));
            res.status(200).json({ status: "success", results: docs.length, data: { [this.name]: docs } });
        });
        this.getOne = (id = "id", popOptions) => catchAsync(async (req, res, next) => {
            var _a;
            let query = this.Model.findById((_a = req.params) === null || _a === void 0 ? void 0 : _a[id]);
            popOptions && query.populate(popOptions);
            const doc = await query;
            if (!doc)
                return next(new AppError_1.default(`There is no ${this.name} found with that id`, 404));
            res.status(200).json({ status: "success", data: { [this.name.toLowerCase()]: doc } });
        });
        this.updateOne = () => catchAsync(async (req, res, next) => {
            console.log(req.params);
            const editedDoc = await this.Model.findByIdAndUpdate(req.params.id || req.params.quizId, req.body, {
                runValidators: true,
                new: true,
            });
            if (!editedDoc)
                return next(new AppError_1.default(`There is no ${this.name} found with that id`, 404));
            res.status(201).json({ status: "success", data: { [this.name]: editedDoc } });
        });
        this.deleteOne = () => catchAsync(async (req, res, next) => {
            const deletedDoc = await this.Model.findByIdAndDelete(req.params.id);
            if (!deletedDoc)
                return next(new AppError_1.default(`There is no ${this.name} found with that id`, 404));
            res.status(201).json({ status: "success", data: null });
        });
        this.Model = Model;
        this.name = name;
    }
}
exports.default = Factory;