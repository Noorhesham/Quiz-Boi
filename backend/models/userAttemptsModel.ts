import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserAttemptProps extends Document {
  userId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  points: number;
  username: string;
  answers: Array<number>;
  attemptedAt?: Date;
  percentage: number;
  totalPoints: number;
  isPublic:boolean
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
  answers: { type: [{ answer: Number, id: Schema.Types.ObjectId }], required: true },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  isPublic:{type:Boolean,default:true},
  totalPoints: { type: Number },
  percentage: { type: Number },
  attemptedAt: { type: Date, default: new Date(Date.now()) },
});


const UserAttempt: Model<UserAttemptProps> = mongoose.model<UserAttemptProps>("UserAttempt", userAttemptSchema);
export default UserAttempt;
