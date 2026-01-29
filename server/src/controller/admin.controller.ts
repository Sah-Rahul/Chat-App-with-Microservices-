import bcrypt from "bcrypt";
import asyncHandler from "../utils/AsyncHandler";
import { Request, Response } from "express";
import { CreateTeacherSchema } from "../validation/Teacher.validation";
import { TeacherModel } from "../models/teacher.model";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { CreateStaffSchema } from "../validation/Staff.validation";
import { Staff } from "../models/staff.mode";
import { AccountStatus, BlockReason, UserModel } from "../models/user.mode";
import {
  STAFF_HIERARCHY,
  STAFF_HIERARCHY_ARRAY,
  TEACHER_HIERARCHY,
  TEACHER_HIERARCHY_ARRAY,
} from "../enums/enums";
import { uploadToCloudinary } from "../config/cloudinary.config";
import {
  AdminLoginSchema,
  AdminRegisterSchema,
} from "../validation/Admin.validation";
import jwt from "jsonwebtoken";
import { AdminLevel, AdminModel, IAdmin } from "../models/admin.model";
import { AuthRequest } from "../@types/auth.types";
import mongoose from "mongoose";


export const adminRegister = asyncHandler(async (req: Request, res: Response) => {
    const parsed = AdminRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const { name, email, password, gender } = parsed.data;
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) throw new ApiError(409, "Admin already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
      gender,
      role: AdminLevel.ADMIN,
      isActive: true,
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { id: admin._id, email: admin.email, role: admin.role },
          "Admin registered successfully",
        ),
      );
  },
);

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const parsed = AdminLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    throw new ApiError(400, "Invalid input", errors);
  }

  const { email, password } = parsed.data;

  const admin = await AdminModel.findOne({ email }).select("+password");
  if (!admin) throw new ApiError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET_ADMIN!,
    { expiresIn: "1d" },
  );

  res
    .cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json(new ApiResponse(200, { token }, `Welcome back ${admin.name}`));
});

export const adminLogout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export const adminMyProfile = asyncHandler(async (req: Request & { user?: any }, res: Response) => {
    const admin = req.user;

    if (!admin) {
      throw new ApiError(401, "Unauthorized");
    }

    const isAdmin = await AdminModel.findById(admin.id).select(
      "name email profilePicture role",
    );

    if (!isAdmin) {
      throw new ApiError(404, "Admin not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, isAdmin, "Admin profile fetched"));
  },
);

export const addTeacher = asyncHandler(async (req: Request, res: Response) => {
  const parsed = CreateTeacherSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    throw new ApiError(400, "Invalid input", errors);
  }

  let profilePicture = "";

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "teachers");
    profilePicture = result.secure_url;
  }

  const tempPassword = "teacher@123";

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(tempPassword, salt);

  const teacher = await TeacherModel.create({
    ...parsed.data,
    profilePicture,
    email: "teacher@gmail.com",
    password: hashedPassword,
    role: "teacher",
  });

  res
    .status(201)
    .json(new ApiResponse(201, teacher, "Teacher added successfully"));
});

export const addStaff = asyncHandler(async (req: Request, res: Response) => {
  const parsed = CreateStaffSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );

    throw new ApiError(400, "Invalid input", errors);
  }

  const existingStaff = await Staff.findOne({
    employeeId: parsed.data.employeeId,
  });
  if (existingStaff) throw new ApiError(400, "Employee ID already exists");

  let profilePictureUrl = "";
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "staff");
    profilePictureUrl = result.secure_url;
  }

  const staff = await Staff.create({
    ...parsed.data,
    profilePicture: profilePictureUrl,
  });

  res
    .status(201)
    .json(new ApiResponse(201, staff, "Staff member added successfully"));
});

export const promoteTeacher = asyncHandler(async (req: Request, res: Response) => {
    const teacherId = req.params.id;
    if (!teacherId) throw new ApiError(400, "Invalid teacher ID");

    const teacher = await TeacherModel.findById(teacherId);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    let newDesignation: TEACHER_HIERARCHY;

    if (req.body.newDesignation) {
      newDesignation = req.body.newDesignation as TEACHER_HIERARCHY;
    } else {
      const currentIndex = TEACHER_HIERARCHY_ARRAY.indexOf(
        teacher.designation as TEACHER_HIERARCHY,
      );
      if (currentIndex === -1)
        throw new ApiError(400, "Current designation invalid");
      if (currentIndex === TEACHER_HIERARCHY_ARRAY.length - 1)
        throw new ApiError(400, "Teacher already at highest designation");

      newDesignation = TEACHER_HIERARCHY_ARRAY[currentIndex + 1];
    }

    teacher.designation = newDesignation;
    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Teacher promoted successfully",
      teacher,
    });
  },
);

export const promoteStaff = asyncHandler(async (req: Request, res: Response) => {
    const staffId = req.params.id;
    if (!staffId) throw new ApiError(400, "Invalid staff ID");

    const staff = await Staff.findById(staffId);
    if (!staff) throw new ApiError(404, "Staff not found");

    let newDesignation: STAFF_HIERARCHY;

    if (req.body.newDesignation) {
      newDesignation = req.body.newDesignation as STAFF_HIERARCHY;
    } else {
      const currentIndex = STAFF_HIERARCHY_ARRAY.indexOf(
        staff.designation as STAFF_HIERARCHY,
      );
      if (currentIndex === -1)
        throw new ApiError(400, "Current designation invalid");
      if (currentIndex === STAFF_HIERARCHY_ARRAY.length - 1)
        throw new ApiError(400, "Staff already at highest designation");

      newDesignation = STAFF_HIERARCHY_ARRAY[currentIndex + 1];
    }

    staff.designation = newDesignation;
    await staff.save();

    res.status(200).json({
      success: true,
      message: "Staff promoted successfully",
      staff,
    });
  },
);

export const blockUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.params.id;
    const { reason, blockedTill, remarks } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    if (user.blockStatus.isBlocked)
      throw new ApiError(400, "User already blocked");

    user.blockStatus.isBlocked = true;
    user.blockStatus.reason = reason || BlockReason.OTHER;
    user.blockStatus.blockedAt = new Date();
    user.blockStatus.blockedTill = blockedTill
      ? new Date(blockedTill)
      : undefined;
    user.blockStatus.blockedBy = req.user?.id
      ? new mongoose.Types.ObjectId(req.user.id)
      : undefined;
    user.blockStatus.remarks = remarks;

    user.accountStatus = AccountStatus.BLOCKED;
    user.isActive = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      user,
    });
  },
);

export const unblockUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "Invalid user id");
    }

    const user = await UserModel.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    if (!user.blockStatus.isBlocked) {
      throw new ApiError(400, "User is not blocked");
    }

    user.blockStatus.isBlocked = false;
    user.blockStatus.reason = undefined;
    user.blockStatus.blockedAt = undefined;
    user.blockStatus.blockedTill = undefined;
    user.blockStatus.blockedBy = undefined;
    user.blockStatus.remarks = undefined;

    user.accountStatus = AccountStatus.ACTIVE;
    user.isActive = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User unblocked successfully",
      user,
    });
  },
);

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await UserModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  await UserModel.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const getAllTeacher = asyncHandler(async (req: Request, res: Response) => {
    const teachers = await TeacherModel.find()
      .populate("department", "name code")
      .populate("subjects", "name code")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(
        new ApiResponse(200, teachers, "All teachers fetched successfully"),
      );
  },
);

export const getTeacherById = asyncHandler(async (req: Request, res: Response) => {
    const teacherId = req.params.id;

    const teacher = await TeacherModel.findById(teacherId).select("-password");
    if (!teacher) throw new ApiError(404, "teacher not found");

    res
      .status(200)
      .json(new ApiResponse(200, teacher, "User fetched successfully"));
  },
);

export const getAllStaff = asyncHandler(async (req: Request, res: Response) => {
  const staff = await Staff.find().sort({ joiningDate: -1 });
  res
    .status(200)
    .json(new ApiResponse(200, staff, "All staff fetched successfully"));
});

export const getStaffById = asyncHandler(async (req: Request, res: Response) => {
    const staffId = req.params.id;

    const staff = await Staff.findById(staffId).select("-password");
    if (!staff) throw new ApiError(404, "staff not found");

    res
      .status(200)
      .json(new ApiResponse(200, staff, "User fetched successfully"));
  },
);

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find()
    .select("-password")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await UserModel.findById(userId).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export const approveAdmission = asyncHandler(async (req: Request, res: Response) => {},
);

export const rejectAdmission = asyncHandler(async (req: Request, res: Response) => {},
);