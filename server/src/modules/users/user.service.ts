import mongoose from "mongoose";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import { UpdateUserDTO } from "./user.dto";
import UserModel from "./user.model";

export const getProfileService = async (userId: string) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const user = await UserModel.findById(userId).select(
    "-password -passwordResetToken -passwordResetExpires",
  );
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};

export const updateProfileService = async (
  userId: string,
  data: UpdateUserDTO,
) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};

export const getMyStatisticsService = async (userId: string) => {
  // TODO: Get current user's statistics (enrollments, certificates, etc.)
};

export const getAllUsersService = async () => {
  const users = await UserModel.find().sort({ createdAt: -1 }).select("-passwordResetExpires -passwordResetToken")

  return users;
};

export const getUserByIdService = async (userId: string) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User ID is required");
  }

  const user = await UserModel.findById(userId).select(
    "-password -passwordResetExpires -passwordResetToken",
  );

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};

export const deleteUserService = async (userId: string) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User ID is required");
  }

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { isDeleted: true, deletedAt: new Date() },
    { new: true },
  ).select("-password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};

export const suspendUserService = async (
  userId: string,
  reason: string,
  adminId: string,
) => {
  if (!userId) throw new ApiError(400, "User ID is required");
  if (!reason) throw new ApiError(400, "Suspension reason is required");
  if (!adminId) throw new ApiError(401, "Admin ID required");

  const user = await UserModel.findById(userId).select(
    "-passwordResetExpires -passwordResetToken",
  );
  if (!user) throw new ApiError(404, "User not found");

  if (user._id.toString() === "institute_admin") {
    throw new ApiError(403, "You cannot suspend yourself");
  }

  user.isSuspended = true;
  user.suspendedAt = new Date();
  user.suspensionReason = reason;
  user.suspendedBy = new mongoose.Types.ObjectId(adminId);

  await user.save();

  return user;
};

export const activateUserService = async (userId: string, adminId: string) => {
  if (!userId)
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User ID is required");
  if (!adminId)
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Admin ID required");

  const user = await UserModel.findById(userId).select("+password");
  if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");

  user.isSuspended = false;
  user.suspensionReason = "";
  user.suspendedAt = undefined;
  user.suspendedBy = undefined;

  await user.save();

  return user;
};

export const getUserStatisticsService = async (userId: string) => {
  // TODO: Get user statistics (admin view)
};
