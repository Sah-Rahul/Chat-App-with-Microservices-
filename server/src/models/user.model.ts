import mongoose, { Schema, Document, Model } from "mongoose"; 
import { UserRole } from "../@types/enums";
 

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  role: UserRole;

  avatarUrl?: string;
  phone?: string;
  address?: string;

  isVerified: boolean;
  isBlocked: boolean;

  lastSeenAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true,  select: false,},

    role: { type: String, enum: Object.values(UserRole), required: true },

    avatarUrl: { type: String },
    phone: { type: String },
    address: { type: String },

    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    lastSeenAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
