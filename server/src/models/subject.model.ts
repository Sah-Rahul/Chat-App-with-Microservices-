import mongoose, { Schema, Document, Model } from "mongoose";

export enum SubjectType {
  THEORY = "theory",
  PRACTICAL = "practical",
  BOTH = "both",
}

export interface ISubject extends Document {
  name: string;
  code: string;
  department: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  semester: number;
  credits: number;
  type: SubjectType;
  assignedTeacher?: mongoose.Types.ObjectId;
  totalClasses?: number;
  isActive: boolean;
}

const SubjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
    },
    credits: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: Object.values(SubjectType),
      default: SubjectType.THEORY,
    },
    assignedTeacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    totalClasses: {
      type: Number,
      default: 0,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

SubjectSchema.index({ course: 1, semester: 1 });

export const Subject: Model<ISubject> = mongoose.model<ISubject>(
  "Subject",
  SubjectSchema,
);
