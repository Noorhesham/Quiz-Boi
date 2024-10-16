import { Document, Model, Query } from "mongoose";
interface QueryString {
  [key: string]: any;
}

class ApiFeatures<T extends Document> {
  query: Query<T[], T>;
  queryString: QueryString;
  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString }; //i take the raw object from the url
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
    } else this.query = this.query.sort("-createdAt");
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else this.query = this.query.select("-v");
    return this;
  }
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  async getTotalPages(): Promise<number> {
    const totalDocs = await this.query.countDocuments();
    const limit = +this.queryString.limit || 100;
    return Math.ceil(totalDocs / limit);
  }
}

export default ApiFeatures