import { Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendToken } from "../utils/SendToken";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  ChangePasswordSchema,
  CreateUserSchema,
  ForgotPasswordSchema,
  LoginUserSchema,
  UpdateUserSchema,
} from "../validation/user.validation";
import { UserModel } from "../models/user.mode";
import { OtpModel } from "../models/otp.model";
import { sendEmail } from "../EmailTemplates/sendEmail"; 
import { forgotPasswordEmailTemplate } from "../EmailTemplates/forgotEmailEmailTemplate";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = CreateUserSchema.safeParse(req.body);
    if (!parsed.success) throw parsed.error;

    const { name, email, password, phone, address, gender } = parsed.data;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      role: "student",
      isActive: true,
      accountStatus: "active",
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { id: user._id, email: user.email },
          "User registered successfully",
        ),
      );
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const parsed = LoginUserSchema.safeParse(req.body);
  if (!parsed.success) throw parsed.error;

  const { email, password } = parsed.data;

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  sendToken({
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    statusCode: 200,
    res,
    message: "Login successful",
  });
});

export const logOutUser = asyncHandler(async (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const myProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await UserModel.findById(req.user?.id).select("-password");
    if (!user) throw new ApiError(404, "User not found");

    res.status(200).json(new ApiResponse(200, user, "Profile fetched"));
  },
);

export const updateProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = UpdateUserSchema.safeParse(req.body);
    if (!parsed.success) throw parsed.error;

    const user = await UserModel.findByIdAndUpdate(req.user?.id, parsed.data, {
      new: true,
    }).select("-password");

    if (!user) throw new ApiError(404, "User not found");

    res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully"));
  },
);

export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = ChangePasswordSchema.safeParse(req.body);
    if (!parsed.success) throw parsed.error;

    const { oldPassword, newPassword } = parsed.data;

    const user = await UserModel.findById(req.user?.id).select("+password");
    if (!user) throw new ApiError(404, "User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new ApiError(400, "Old password is incorrect");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password changed successfully"));
  },
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = ForgotPasswordSchema.safeParse(req.body);
    if (!parsed.success) throw parsed.error;

    const { email } = parsed.data;

    const user = await UserModel.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    await OtpModel.deleteMany({ userId: user._id });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpModel.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    const resetPasswordUrl = `${process.env.CLIENT}/reset-password?email=${email}`;

    const emailHtml = forgotPasswordEmailTemplate({
      userName: user.name,
      resetPasswordUrl,
      resetCode: otp,
      expiryMinutes: 10,
    });

    await sendEmail({
      email: user.email,
      subject: "Reset Your Password - Sunrise College",
      html: emailHtml,
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Password reset code sent to your email. Please check your inbox.",
        ),
      );
  },
);
