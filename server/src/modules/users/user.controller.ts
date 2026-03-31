import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import asyncHandler from "../../utils/AsyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

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
    const user = await userService.updateProfileService(userId, data);

    res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully"));
  },
);

export const getMyStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

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

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const user = await userService.deleteUserService(id);

  res.status(200).json(new ApiResponse(200, user, "User deleted successfully"));
});

export const suspendUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const adminId = (req.user as any).userId;
  const { reason } = req.body;

  await userService.suspendUserService(id, reason, adminId);

  res.status(200).json({ message: "User suspended successfully" });
});

export const activateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const adminId = (req.user as any).userId;
    await userService.activateUserService(id, adminId);
    res.status(200).json({ message: "User activated successfully" });
  },
);

export const getUserStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
