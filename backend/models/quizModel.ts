import mongoose, { Schema, Document } from "mongoose";
const slugify = require("slugify");
interface QuizProps extends Document {
  title: string;
  questions: Array<mongoose.Types.ObjectId>;
  description: string;
  author: mongoose.Types.ObjectId;
  likes: Array<mongoose.Types.ObjectId>;
  usersAttempted: Array<mongoose.Types.ObjectId>;
  questionNum: number;
  likesCount:number|0
  comments: [mongoose.Types.ObjectId];
  tags: [string];
  slug: string;
  createdAt: Date;
  coverImage?: string;
  duration: number;
  published: boolean;
  numberOfQuestions?: number;
  attemptsNum?: number;
  color: "orange" | "pink" | "blue" | "purple" | "green";
}

const quizSchema = new Schema<QuizProps>(
  {
    title: {
      type: String,
      required: [true, "quiz must have a title"],
      trim: true,
      maxlength: [40, "Name of quiz is too long"],
      minlength: [4, "Name of quiz is too short"],
    },
    coverImage: { type: String, default: `quiz${Math.trunc(Math.random() * 5) + 1}.png` },
    createdAt: { type: Date, default: Date.now() },
    tags: { type: [String], minlength: [1, "Provide at least one topic to the quiz"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionNum: {
      type: Number,
    },
    attemptsNum: {
      type: Number,
    },
    questions: {
      type: [Schema.Types.ObjectId],
      ref: "Question",
      required: true,
    },
    duration: { type: Number },
    usersAttempted: [{ type: Schema.Types.ObjectId, ref: "UserAttempt" }],
    published: { type: Boolean, default: false },
    color: { type: String, default: "purple" },
    likesCount:{type:Number,default:0}
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

quizSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.questionNum = this.questions?.length;
  this.attemptsNum = this.usersAttempted?.length;
  this.numberOfQuestions = this.questions?.length;
  this.likesCount=this.likes?.length
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

quizSchema.pre(/^find/, function (this: any, next) {
    // this.populate({
    //   path: "likes",
    // })
//       .populate({
//         path: "author",
//         select: " name photo id _id followingCount quizzes followersCount",
//       })
//       .populate({
//         path: "comments",
//         select: "content user ",
//       });
  
  next();
});
// quizSchema.pre<any>("findOne", function (next: any) {
//   this.populate({
//     path: "usersAttempted",
//     select: "-__v ",
//   });

//   next();
// });
quizSchema.virtual("questionCount").get(function () {
  return this.questions?.length;
});
const Quiz = mongoose.model<QuizProps>("Quiz", quizSchema);
export default Quiz;
