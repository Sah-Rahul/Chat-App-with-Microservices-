import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/AsyncHandler";
import { Request, Response } from "express";
import { TeacherModel } from "../models/teacher.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import {
  ChangeTeacherPasswordSchema,
  LoginTeacherSchema,
  UpdateTeacherProfileSchema,
} from "../validation/Teacher.validation";
import { uploadToCloudinary } from "../config/cloudinary.config";
import { deleteFromCloudinary } from "../config/deleteFromCloudinary";

export const loginTeacher = asyncHandler(async (req: Request, res: Response) => {
    const parsed = LoginTeacherSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const { email, password } = parsed.data;

    const teacher = await TeacherModel.findOne({ email });
    if (!teacher) throw new ApiError(404, "Teacher not found");

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const token = jwt.sign(
      { id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET_TEACHER!,
      { expiresIn: "7d" },
    );

    res.cookie("teacherToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json(new ApiResponse(200, teacher, "Teacher logged in successfully"));
  },
);

export const logoutTeacher = asyncHandler(async (_req, res: Response) => {
  res.clearCookie("teacherToken");
  res.json(new ApiResponse(200, null, "Teacher logged out"));
});

export const teacherProfile = asyncHandler(async (req: any, res: Response) => {
  const teacher = await TeacherModel.findById(req.user.id).select("-password");
  if (!teacher) throw new ApiError(404, "Teacher not found");

  res.json(new ApiResponse(200, teacher, "Teacher profile fetched"));
});

export const changeTeacherPassword = asyncHandler(async (req: any, res: Response) => {
    const parsed = ChangeTeacherPasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const { oldPassword, newPassword } = parsed.data;

    if (oldPassword === newPassword) {
      throw new ApiError(
        400,
        "New password must be different from old password",
      );
    }

    const teacher = await TeacherModel.findById(req.user.id).select(
      "+password",
    );
    if (!teacher) throw new ApiError(404, "Teacher not found");

    const isMatch = await bcrypt.compare(oldPassword, teacher.password);
    if (!isMatch) throw new ApiError(400, "Old password incorrect");

    teacher.password = await bcrypt.hash(newPassword, 10);
    await teacher.save();

    res.json(new ApiResponse(200, null, "Password changed successfully"));
  },
);

export const updateTeacherProfile = asyncHandler(async (req: any, res: Response) => {
    const hasBodyData = req.body && Object.keys(req.body).length > 0;
    const hasFile = !!req.file;

    if (!hasBodyData && !hasFile) {
      throw new ApiError(400, "Nothing to update");
    }

    const existingTeacher = await TeacherModel.findById(req.user.id);
    if (!existingTeacher) {
      throw new ApiError(404, "Teacher not found");
    }

    let updateData: any = {};

    if (hasBodyData) {
      const parsed = UpdateTeacherProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new ApiError(400, "Invalid input", parsed.error.flatten());
      }
      updateData = parsed.data;
    }

    if (hasFile) {
      const result = await uploadToCloudinary(req.file.buffer, "users");
      updateData.profilePicture = result.secure_url;

      if (existingTeacher.profilePicture) {
        await deleteFromCloudinary(existingTeacher.profilePicture);
      }
    }

    const teacher = await TeacherModel.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    res.json(new ApiResponse(200, teacher, "Profile updated successfully"));
  },
);