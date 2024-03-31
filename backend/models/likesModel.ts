import mongoose, { Schema } from "mongoose";

const likesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  quiz: { type: Schema.Types.ObjectId, required: true, ref: "Quiz" },
  createdAt: { type: Date, default: Date.now() },
});
likesSchema.index({ user: 1, quiz: 1 }, { unique: true });
likesSchema.pre<any>(/^find/, function (next: any) {
  this.populate({ path: "user", select: "name photo" });
  next();
});
const Likes = mongoose.model("Likes", likesSchema);
export default Likes;
