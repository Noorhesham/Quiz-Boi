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
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = Object.assign({}, this.queryString); //i take the raw object from the url
        const excludeFields = ['page', 'sort', 'limit', 'fields']; //i exclude the fields from it 
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj); //i turn it to a string to replace the $
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr)); //back to object again to use in the query
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }
        else
            this.query = this.query.sort("-createdAt");
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        }
        else
            this.query = this.query.select("-v");
        return this;
    }
    paginate() {
        const page = +this.queryString.page || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
    getTotalPages() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalDocs = yield this.query.countDocuments();
            const limit = +this.queryString.limit || 100;
            return Math.ceil(totalDocs / limit);
        });
    }
}
exports.default = ApiFeatures;
//# sourceMappingURL=ApiFeatures.js.map