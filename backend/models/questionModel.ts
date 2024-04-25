import mongoose, { Schema, Document } from "mongoose";

interface Question extends Document {
  quiz: mongoose.Types.ObjectId;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  coverImage?: string;
  explain?: string;
  points?: number;
  hint?: {
    coverImage?: string;
    text?: string;
  };
}

const questionSchema = new Schema<Question>({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
    validate: {
      validator: function (val: string[]) {
        console.log(this);
        return val?.length > 0; // Ensure at least one answer exists
      },
      message: "At least one answer is required",
    },
  },
  coverImage: { type: String },
  explain: { type: String },
  hint: {
    coverImage: { type: String },
    text: { type: String },
  },
  points: { type: Number, default: 10 },
  correctAnswerIndex: {
    type: Number,
    required: true,
  },
});

// Create and export Question model
const Question = mongoose.model<Question>("Question", questionSchema);
export default Question;
