import mongoose, { Schema, Document } from "mongoose";

interface PrerequisiteProps extends Document {
  title: string;
  type: "video" | "pdf" | "link";
  url: string; // link to video or PDF
  description?: string;
  quiz: mongoose.Types.ObjectId; // Reference to the quiz this prerequisite belongs to
}

const prerequisiteSchema = new Schema<PrerequisiteProps>({
  title: {
    type: String,
    required: [true, "Prerequisite must have a title"],
    trim: true,
    minlength: [3, "Prerequisite title is too short"],
  },
  type: {
    type: String,
    required: true,
    enum: ["pdf", "link"],
  },
  url: {
    type: String,
    required: [true, "Prerequisite must have a URL"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Description is too long"],
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
});

const Prerequisite = mongoose.model<PrerequisiteProps>("Prerequisite", prerequisiteSchema);
export default Prerequisite;
