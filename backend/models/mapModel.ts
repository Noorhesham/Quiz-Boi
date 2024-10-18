import mongoose, { Schema } from "mongoose";

const MapSchema = new Schema({
  name: { type: String, required: true, ref: "User" },
  levels: [
    {
      quizId: { type: Schema.Types.ObjectId, ref: "Quiz" }, // Populate the quiz
      position: { x: Number, y: Number },
      difficulty: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mapImage: { type: String },
  public: { type: Boolean, default: false },
});

// Ensure quizzes are unique per user
MapSchema.index({ name: 1, quizId: 1 }, { unique: true });

MapSchema.pre<any>(/^find/, function (next) {
  this.populate({ path: "author", select: "name photo" }).populate({ path: "levels.quizId", select: "-questions" });
  next();
});

const Map = mongoose.model("Map", MapSchema);
export default Map;
