import mongoose, { Schema, Document } from "mongoose";
const slugify = require("slugify");
interface QuizProps extends Document {
  title: string;
  questions: Array<QuestionProps>;
  author: mongoose.Types.ObjectId;
  likes: Array<mongoose.Types.ObjectId>;
  usersAttempted: Array<mongoose.Types.ObjectId>;
  questionNum: number;
  answerNum: number;
  comments: [mongoose.Types.ObjectId];
  tags: [string];
  slug: string;
  createdAt: Date;
}

interface QuestionProps {
  question: string;
  answers: Array<{ answer: String; photo: string }>;
  correctAnswerIndex: number;
}
function validateQuestionsLength(this: any) {
  return this.questions?.length === this.questionNum;
}

const quizSchema = new Schema<QuizProps>(
  {
    title: {
      type: String,
      required: [true, "quiz must have a title"],
      trim: true,
      maxlength: [20, "Name of quiz is too long"],
      minlength: [4, "Name of quiz is too short"],
    },
    createdAt: { type: Date, default: Date.now() },
    tags: { type: [String], minlength: [1, "Provide at least one topic to the quiz"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionNum: {
      type: Number,
      required: true,
    },
    answerNum: {
      type: Number,
      required: true,
    },
    questions: {
      type: [
        {
          question: {
            type: String,
            required: true,
          },
          photo: String,
          answers: {
            type: [
              {
                answer: {
                  type: String,
                  required: true,
                },
                photo: String,
              },
            ],
            validate: {
              validator: function (this: any, answers: any[], answerNum: number) {
                console.log(this)
                return answers?.length === this.parent()?.answerNum;
              },
              message: "Number of answers does not match answerNum",
            },
          },
          correctAnswerIndex: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
      validate: [validateQuestionsLength, "Number of questions does not match questionNum(max length) you entered"],
    },
    usersAttempted:[{type: Schema.Types.ObjectId,ref:'UserAttempt'}]
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

quizSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
quizSchema.virtual("comments", {
  ref: "Comments",
  foreignField: "quizId",
  localField: "_id",
});
quizSchema.virtual("likes", {
  ref: "Likes",
  localField: "_id",
  foreignField: "quiz",
});

// quizSchema.virtual("usersAttempted", {
//   ref: "UserAttempt",
//   localField: "_id",
//   foreignField: "quizId",
// });

quizSchema.virtual("likesCount").get(function (this: any) {
  return this.likes?.length;
});
quizSchema.virtual("commentsCount").get(function (this: any) {
  return this.comments?.length;
});

quizSchema.pre<any>('findOne', function (next: any) {
  this.populate({
    path: "author",
    select: "name photo",
  })
    .populate({
      path: "usersAttempted",
      select: "-__v ",
    })
    .populate({
      path: "comments",
      select: "content user -quizId",
    })
    .populate({ path: "likes", select: "-__v -quiz" });
  next();
});

const Quiz = mongoose.model<QuizProps>("Quiz", quizSchema);
export default Quiz;
