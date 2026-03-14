import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";
import { classDay, CourseLevel, CourseStatus } from "./course.enums";

export interface ICourse extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;

  thumbnail: {
    url: string;
    publicId: string;
  };

  price: number;
  discountPercentage: number;
  discountedPrice: number;
  currency: string;

  level: CourseLevel;
  language: string;

  curriculum: { title: string; lectures: mongoose.Types.ObjectId[] }[];

  duration: number;
  totalLectures: number;
  lectures: mongoose.Types.ObjectId[];

  categoryId: mongoose.Types.ObjectId;
  instructorId: mongoose.Types.ObjectId;
  instituteId?: mongoose.Types.ObjectId;

  status: CourseStatus;
  coursePublish: boolean;
  startDate?: Date;

  learningOutcomes: string[];
  prerequisites: string[];
  tags: string[];

  classDay: classDay[];
  certificateEnabled: boolean;

  rating: number;
  totalReviews: number;
  totalEnrollments: number;

  isFeatured: boolean;
  isBestseller: boolean;

  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    subtitle: { type: String, trim: true },
    description: { type: String, required: true },

    thumbnail: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },

    price: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    discountedPrice: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "INR" },

    level: { type: String, enum: Object.values(CourseLevel), required: true },
    language: {
      type: String,
      default: "english",
    },

    curriculum: [
      {
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
      },
    ],

    duration: { type: Number, default: 0 },
    totalLectures: { type: Number, default: 0 },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.UNDER_REVIEW,
    },

    coursePublish: { type: Boolean, default: false },
    startDate: { type: Date },

    classDay: {
      type: [{ type: String, enum: Object.values(classDay) }],
      default: [classDay.SUNDAY],
    },

    learningOutcomes: [String],
    prerequisites: [String],
    tags: [String],
    certificateEnabled: { type: Boolean, default: false },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalEnrollments: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },

    publishedAt: Date,
  },
  { timestamps: true },
);

courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.coursePublish && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  if (this.isModified("price") || this.isModified("discountPercentage")) {
    this.discountedPrice = Math.round(
      this.price - (this.price * this.discountPercentage) / 100,
    );
  }
});

courseSchema.index({ slug: 1 });
courseSchema.index({ categoryId: 1, status: 1 });
courseSchema.index({ instructorId: 1 });
courseSchema.index({ rating: -1, totalEnrollments: -1 });
courseSchema.index({ title: "text", description: "text" });

const CourseModel = mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;
