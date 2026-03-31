import mongoose, { Schema, Document } from "mongoose";
import { CourseLanguage, CourseLevel, CourseStatus } from "./course.enums";
import slugify from "slugify";

export interface ICourse extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  price: number;
  discountedPrice?: number;
  currency: string;
  level: CourseLevel;
  language: CourseLanguage;
  duration: number; // in minutes
  categoryId: mongoose.Types.ObjectId;
  instituteId: mongoose.Types.ObjectId;
  instructorId: mongoose.Types.ObjectId;
  status: CourseStatus;
  curriculum: Array<{
    sectionTitle: string;
    sectionOrder: number;
    lectures: Array<{
      lectureTitle: string;
      lectureOrder: number;
      videoUrl?: string;
      videoDuration?: number;
      content?: string;
      resources?: Array<{
        title: string;
        url: string;
        type: string;
      }>;
      isFree: boolean;
    }>;
  }>;
  learningOutcomes: string[];
  prerequisites: string[];
  requirements: string[];
  tags: string[];
  rating: number;
  totalReviews: number;
  totalEnrollments: number;
  totalLectures: number;
  isFeatured: boolean;
  isBestseller: boolean;
  certificateEnabled: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    subtitle: { type: String, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    previewVideo: String,
    price: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number, min: 0 },
    currency: { type: String, default: "USD" },
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      required: true,
    },
    language: {
      type: String,
      enum: Object.values(CourseLanguage),
      default: CourseLanguage.ENGLISH,
    },
    duration: { type: Number, required: true, min: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
    },
    curriculum: [
      {
        sectionTitle: { type: String, required: true },
        sectionOrder: { type: Number, required: true },
        lectures: [
          {
            lectureTitle: { type: String, required: true },
            lectureOrder: { type: Number, required: true },
            videoUrl: String,
            videoDuration: Number,
            content: String,
            resources: [
              {
                title: String,
                url: String,
                type: String,
              },
            ],
            isFree: { type: Boolean, default: false },
          },
        ],
      },
    ],
    learningOutcomes: [String],
    prerequisites: [String],
    requirements: [String],
    tags: [String],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalEnrollments: { type: Number, default: 0 },
    totalLectures: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    certificateEnabled: { type: Boolean, default: true },
    publishedAt: Date,
  },
  { timestamps: true },
);

courseSchema.pre("validate", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
});

courseSchema.index({ slug: 1 });
courseSchema.index({ instituteId: 1, status: 1 });
courseSchema.index({ categoryId: 1, status: 1 });
courseSchema.index({ rating: -1, totalEnrollments: -1 });

const CourseModel = mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel