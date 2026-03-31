import mongoose, { Schema, Document } from "mongoose";
import { CategoryStatus } from "./category.enums";

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: {
    public_url: string;
  };
  status: CategoryStatus;
  totalCourses?: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      public_url: {
        type: String,
      },
    },

    status: {
      type: String,
      enum: Object.values(CategoryStatus),
      default: CategoryStatus.ACTIVE,
    },

    totalCourses: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

categorySchema.pre("validate", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
});

categorySchema.index({ slug: 1 });
categorySchema.index({ status: 1 });

const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;
