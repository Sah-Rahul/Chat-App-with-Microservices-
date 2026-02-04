import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import { authService } from "../services/auth.service";
import { AuthRequest } from "../@types/auth.types";
import { LoginDto, RegisterDto, ChangePasswordDto } from "../dto/register.dto";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const payload: RegisterDto = req.body;
  const user = await authService.register(payload);

  return res.status(201).json(new ApiResponse(201, user, "User registered"));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const payload: LoginDto = req.body;
  const user = await authService.login(payload);

  const { accessToken, refreshToken } = authService.generateTokens(
    user._id.toString(),
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user, accessToken }, `Welcome back ${user.name}`),
    );
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id.toString();
  const user = await authService.myProfile(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched"));
});

export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const payload: ChangePasswordDto = req.body;
    const userId = req.user!._id.toString();

    const result = await authService.changePassword(userId, payload);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Password changed successfully"));
  },
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) throw new ApiError(401, "Refresh token missing");

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;

    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new ApiError(401, "User not found");

    const accessToken = authService.generateTokens(
      user._id.toString(),
    ).accessToken;

    return res
      .status(200)
      .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
  },
);
