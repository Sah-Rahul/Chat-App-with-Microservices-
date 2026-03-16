import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";
import { CourseLevel, CourseStatus } from "./course.enums";

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

  certificateEnabled: boolean;

  reviews: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
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
    language: { type: String, default: "english" },

    curriculum: [
      {
        title: { type: String, required: true },
        lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
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
    instituteId: { type: Schema.Types.ObjectId, ref: "Institute" },

    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
    },

    coursePublish: { type: Boolean, default: false },
    startDate: { type: Date },

    learningOutcomes: [String],
    prerequisites: [String],
    tags: [String],
    certificateEnabled: { type: Boolean, default: false },

    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    rating: { type: Number, default: 0 },
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

  if (this.reviews && this.reviews.length > 0) {
    const totalReviews = this.reviews.length;
    const avgRating =
      this.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

    this.rating = parseFloat(avgRating.toFixed(2));
    this.totalReviews = totalReviews;
  } else {
    this.rating = 0;
    this.totalReviews = 0;
  }
});

courseSchema.index({ slug: 1 });
courseSchema.index({ categoryId: 1, status: 1 });
courseSchema.index({ instructorId: 1 });
courseSchema.index({ rating: -1, totalEnrollments: -1 });
courseSchema.index({ title: "text", description: "text" });

const CourseModel = mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;
