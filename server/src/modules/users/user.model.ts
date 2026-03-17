import mongoose, { Schema, Document } from "mongoose";
import { Gender, UserRole, UserStatus } from "./user.enums";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isWelcomeEmailSent: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  cart: [{ type: String }];
  wishlist: [{ type: String }];

  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String, sparse: true, unique: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    avatar: { type: String },
    gender: { type: String, enum: Object.values(Gender) },
    dateOfBirth: { type: Date },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    isEmailVerified: { type: Boolean, default: false },
    isWelcomeEmailSent: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },

    cart: [{ type: String }],
    wishlist: [{ type: String }],

    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
