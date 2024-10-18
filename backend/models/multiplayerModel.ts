import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface MultiPlayerProps extends Document {
  sessionId: string;
  user1Attempt: mongoose.Types.ObjectId;
  user2Attempt: mongoose.Types.ObjectId;
}

// Define schema for Comment document
const multiSchema = new Schema<MultiPlayerProps>({
  user1Attempt: {
    type: Schema.Types.ObjectId,
    ref: "UserAttempt",
  },
  user2Attempt: {
    type: Schema.Types.ObjectId,
    ref: "UserAttempt",
  },
  sessionId: {
    type: String,
    required: true,
  },
});
multiSchema.pre<any>(/^find/, function (next: any) {
  this.populate({ path: "user1Attempt" }).populate({ path: "user2Attempt" });
  next();
});

const Games = mongoose.model<MultiPlayerProps>("Games", multiSchema);
export default Games;
