import mongoose, { Schema, Document } from "mongoose";

export interface IWishlistItem {
  courseId: mongoose.Types.ObjectId;
  addedAt: Date;
  notifyOnDiscount: boolean;
}

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  items: IWishlistItem[];
  totalItems: number;
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        addedAt: { type: Date, default: Date.now },
        notifyOnDiscount: { type: Boolean, default: true },
      },
    ],
    totalItems: { type: Number, default: 0 },
  },
  { timestamps: true },
);

wishlistSchema.index({ userId: 1 });
wishlistSchema.index({ "items.courseId": 1 });

// Update totalItems count
wishlistSchema.pre("save", function (next) {
  this.totalItems = this.items.length;
});

 const WishlistModel = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default WishlistModel