import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const isAuthenticated = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Token is missing. Please login.");
    }

    try {
      const secret = process.env.JWT_SECRET_KEY;
      if (!secret) throw new Error("JWT_SECRET_KEY is missing");

      const decoded = jwt.verify(token, secret) as { id: string };

      req.user = { id: decoded.id };

      next();
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token");
    }
  },
);
