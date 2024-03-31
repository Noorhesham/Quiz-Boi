import mongoose, { Schema, Document, Model } from "mongoose";

interface UserAttemptProps extends Document {
  userId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  points: number;
  username: string;
}

const userAttemptSchema = new Schema<UserAttemptProps>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return !this.username;
    },
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  username: {
    type: String,
    required: function () {
      return !this.userId;
    },
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
});
userAttemptSchema.index({ quizId: 1, userId: 1, username: 1 }, { unique: true }); //the user and the quiz of each attempt compined must be unique
userAttemptSchema.pre<any>(/^find/, function (next: any) {
  this.populate({
    path: "quizId",
    select: "title tags questionNum",
  });
  next();
});
const UserAttempt: Model<UserAttemptProps> = mongoose.model<UserAttemptProps>("UserAttempt", userAttemptSchema);
export default UserAttempt;
