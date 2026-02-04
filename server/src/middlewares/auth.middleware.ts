import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import asyncHandler from "../utils/AsyncHandler";
import { UserRole } from "../@types/enums";
import { AuthRequest } from "../@types/auth.types";

interface JwtPayload {
  _id: string;
}

export const isAuthenticated = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return next(new ApiError(401, "Not authorized, token missing"));

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;

    const userDoc = await User.findById(decoded.id).select("-password");
    if (!userDoc) return next(new ApiError(401, "User not found"));

    req.user = {
      _id: userDoc._id.toString(),
      role: userDoc.role,
    };

    next();
  },
);

export const authorize =
  (...roles: UserRole[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) return next(new ApiError(401, "Not authorized"));

    if (!roles.includes(userRole)) {
      return next(
        new ApiError(403, "You are not allowed to access this route"),
      );
    }

    next();
  };
