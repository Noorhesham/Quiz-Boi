import mongoose, { Schema, Document, Model } from "mongoose";

const tagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    required: true
  }
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
