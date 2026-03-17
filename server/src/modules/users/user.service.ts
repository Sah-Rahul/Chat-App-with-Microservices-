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

export const getAllUsersService = async () => {
  const users = await UserModel.find()
    .sort({ createdAt: -1 })
    .select("-passwordResetExpires -passwordResetToken");

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

 
 

 
