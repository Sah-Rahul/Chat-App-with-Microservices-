import mongoose, { Schema, Document, Model } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
  STAFF = 'staff',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum AccountStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  SUSPENDED = 'suspended',
}

export enum BlockReason {
  LOW_ATTENDANCE = 'low_attendance',
  FEE_OVERDUE = 'fee_overdue',
  BOOK_OVERDUE = 'book_overdue',
  DISCIPLINARY = 'disciplinary',
  OTHER = 'other',
}

interface IBlockStatus {
  isBlocked: boolean;
  reason?: BlockReason;
  blockedAt?: Date;
  blockedTill?: Date;
  blockedBy?: mongoose.Types.ObjectId;
  remarks?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address: string;
  gender: Gender;
  isActive: boolean;
  accountStatus: AccountStatus;
  blockStatus: IBlockStatus;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    phone: String,
    address: String,
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    isActive: { type: Boolean, default: true },
    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    blockStatus: {
      isBlocked: { type: Boolean, default: false },
      reason: { type: String, enum: Object.values(BlockReason) },
      blockedAt: Date,
      blockedTill: Date,
      blockedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      remarks: String,
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> =
  mongoose.model<IUser>('User', UserSchema);