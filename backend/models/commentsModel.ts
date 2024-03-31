import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface CommentProps extends Document {
  user: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  content: string;
  createdAt:Date
}

// Define schema for Comment document
const commentSchema = new Schema<CommentProps>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
  createdAt: { type: Date, default: Date.now() },
});
commentSchema.pre<any>(/^find/, function (next: any) {
  this.populate({ path: "user", select: "name photo" });
  next();
});
const Comments = mongoose.model<CommentProps>("Comments", commentSchema);
export default Comments;
