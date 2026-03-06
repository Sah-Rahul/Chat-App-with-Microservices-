import mongoose, { Schema, Document } from "mongoose";
import { LectureStatus, LectureType, ResourceType } from "./lecture.enums";

export interface IResource {
  title: string;
  url: string;
  type: ResourceType;
}

export interface ILecture extends Document {
  courseId: mongoose.Types.ObjectId;     // kis course ka hai
  sectionId: string;                     // course.curriculum ka _id
  title: string;
  description?: string;
  type: LectureType;

  // Video fields
  video?: {
    url: string;
    publicId: string;
    duration: number;   // seconds
  };

  // Article fields
  articleContent?: string;

  order: number;                         // section ke andar position
  isPreview: boolean;                    // free preview
  status: LectureStatus;
  resources: IResource[];

  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(ResourceType),
      required: true,
    },
  },
  { _id: false },
);

const lectureSchema = new Schema<ILecture>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    // course.curriculum array ka ObjectId
    sectionId: {
      type: String,
      required: true,
      index: true,
    },

    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },

    type: {
      type: String,
      enum: Object.values(LectureType),
      default: LectureType.VIDEO,
    },

    video: {
      url: { type: String },
      publicId: { type: String },
      duration: { type: Number, default: 0 },   // seconds
    },

    articleContent: { type: String },

    order: { type: Number, default: 0 },
    isPreview: { type: Boolean, default: false },

    status: {
      type: String,
      enum: Object.values(LectureStatus),
      default: LectureStatus.DRAFT,
    },

    resources: [resourceSchema],
  },
  { timestamps: true },
);

lectureSchema.index({ courseId: 1, sectionId: 1, order: 1 });

const LectureModel = mongoose.model<ILecture>("Lecture", lectureSchema);

export default LectureModel;