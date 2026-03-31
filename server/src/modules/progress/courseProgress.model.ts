import mongoose, { Schema, Document } from "mongoose";
import { LectureStatus } from "./courseProgress.enums";

export interface ILectureProgress {
  lectureId: string;
  status: LectureStatus;
  watchedDuration: number; // in seconds
  totalDuration: number; // in seconds
  completedAt?: Date;
  lastWatchedAt: Date;
}

export interface ISectionProgress {
  sectionId: string;
  completedLectures: number;
  totalLectures: number;
  lectures: ILectureProgress[];
}

export interface ICourseProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrollmentId: mongoose.Types.ObjectId;
  overallProgress: number; // 0-100
  completedLectures: number;
  totalLectures: number;
  totalWatchTime: number; // in seconds
  sections: ISectionProgress[];
  currentLecture?: {
    sectionId: string;
    lectureId: string;
  };
  quizScores?: Array<{
    quizId: string;
    score: number;
    maxScore: number;
    attemptedAt: Date;
  }>;
  assignmentScores?: Array<{
    assignmentId: string;
    score: number;
    maxScore: number;
    submittedAt: Date;
  }>;
  certificateEligible: boolean;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const courseProgressSchema = new Schema<ICourseProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    overallProgress: { type: Number, default: 0, min: 0, max: 100 },
    completedLectures: { type: Number, default: 0 },
    totalLectures: { type: Number, required: true },
    totalWatchTime: { type: Number, default: 0 },
    sections: [
      {
        sectionId: { type: String, required: true },
        completedLectures: { type: Number, default: 0 },
        totalLectures: { type: Number, required: true },
        lectures: [
          {
            lectureId: { type: String, required: true },
            status: {
              type: String,
              enum: Object.values(LectureStatus),
              default: LectureStatus.NOT_STARTED,
            },
            watchedDuration: { type: Number, default: 0 },
            totalDuration: { type: Number, required: true },
            completedAt: Date,
            lastWatchedAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    currentLecture: {
      sectionId: String,
      lectureId: String,
    },
    quizScores: [
      {
        quizId: String,
        score: Number,
        maxScore: Number,
        attemptedAt: Date,
      },
    ],
    assignmentScores: [
      {
        assignmentId: String,
        score: Number,
        maxScore: Number,
        submittedAt: Date,
      },
    ],
    certificateEligible: { type: Boolean, default: false },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
courseProgressSchema.index({ userId: 1, overallProgress: 1 });
courseProgressSchema.index({ enrollmentId: 1 });

const CourseProgressModel = mongoose.model<ICourseProgress>(
  "CourseProgress",
  courseProgressSchema,
);

export default CourseProgressModel;
