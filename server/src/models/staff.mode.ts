import mongoose, { Schema, Document, Model } from "mongoose";

export enum StaffDepartment {
  ADMINISTRATION = "administration",
  LIBRARY = "library",
  SECURITY = "security",
  MAINTENANCE = "maintenance",
  TRANSPORT = "transport",
  CANTEEN = "canteen",
  IT = "it",
  ACCOUNTS = "accounts",
  HR = "hr",
  OTHER = "other",
}

export enum StaffShift {
  MORNING = "morning",
  EVENING = "evening",
  NIGHT = "night",
  ROTATIONAL = "rotational",
}

export interface IStaff extends Document {
  name: string;
  employeeId: string;
  department: StaffDepartment;
  designation: string;
  shift: StaffShift;
  salary: number;
  joiningDate: Date;
  exitDate?: Date;
  isActive: boolean;
  profilePicture?: string;
}

const StaffSchema = new Schema<IStaff>(
  {
    name: {
      type: String,
      required: true,
      // ❌ unique removed (names can repeat)
    },
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true, // ✅ single index
      uppercase: true,
    },
    department: {
      type: String,
      enum: Object.values(StaffDepartment),
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    shift: {
      type: String,
      enum: Object.values(StaffShift),
      default: StaffShift.MORNING,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    exitDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePicture: String,
  },
  { timestamps: true },
);

 
StaffSchema.index({ department: 1 });
StaffSchema.index({ isActive: 1 });

export const Staff = mongoose.model<IStaff>("Staff", StaffSchema);
