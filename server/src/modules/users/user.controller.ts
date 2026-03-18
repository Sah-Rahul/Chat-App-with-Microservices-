import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import asyncHandler from "../../utils/AsyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { uploadToCloudinary } from "../../config/cloudinary.config";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  const user = await userService.getProfileService(userId);

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile fetched successfully"));
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const data = req.body;

    
    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "lms/users/avatars"
      );
      data.avatar = {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      };
    }

    const user = await userService.updateProfileService(userId, data);

    res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully"));
  },
);

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsersService();

  res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const user = await userService.getUserByIdService(id);

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});
 