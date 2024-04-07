import mongoose, { Schema, Document, Model } from "mongoose";

interface UserAttemptProps extends Document {
  userId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  points: number;
  username: string;
  answers: Array<number>;
  attemptedAt?: Date;
  percentage:number
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
  answers: { type: [{answer:Number,id:Schema.Types.ObjectId}], required: true },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  percentage:{type:Number},
  attemptedAt: { type: Date, default: new Date(Date.now()) },
});
userAttemptSchema.pre<any>(/^find/, function (next: any) {
  this.populate({
    path: "quizId",
    select: "title tags ",
  });
  next();
});


const UserAttempt: Model<UserAttemptProps> = mongoose.model<UserAttemptProps>("UserAttempt", userAttemptSchema);
export default UserAttempt;
