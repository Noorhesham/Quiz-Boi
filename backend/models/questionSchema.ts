import mongoose, { Schema, Document } from "mongoose";

interface Answer {
  answer: string;
  photo?: string;
}

interface Question extends Document {
  quiz: mongoose.Types.ObjectId;
  question: string;
  answers: Answer[];
  correctAnswerIndex: number;
}

const answerSchema = new Schema<Answer>({
  answer: {
    type: String,
    required: true,
  },
  photo: String,
});

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
    type: [answerSchema],
    required: true,
    validate: {
      validator: function(this: Question) {
        return this.answers.length > 0; // Ensure at least one answer exists
      },
      message: "At least one answer is required",
    },
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    validate: {
      validator: function(this: Question) {
        return this.correctAnswerIndex >= 0 && this.correctAnswerIndex < this.answers.length; // Ensure correct answer index is valid
      },
      message: "Invalid correct answer index",
    },
  },
});

// Create and export Question model
const QuestionModel = mongoose.model<Question>("Question", questionSchema);
export default QuestionModel;
