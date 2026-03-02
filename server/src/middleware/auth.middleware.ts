import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constant/httpStatus";

interface JWTPayload {
  userId: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Access token required");
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JWTPayload;

    (req as any).user = {
      _id: decoded.userId,
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid token"));
    }
    if (err instanceof jwt.TokenExpiredError) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Token expired"));
    }
    next(err);
  }
};
