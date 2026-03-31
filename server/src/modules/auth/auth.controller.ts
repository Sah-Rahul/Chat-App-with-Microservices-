import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.registerService(req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(HTTP_STATUS.CREATED, result.user, result.message));
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, accessToken, refreshToken } = await authService.loginService(
      req.body,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          { user, accessToken },
          `Welcome back ${user.firstName}`,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.userId;

    const result = await authService.logoutService(userId);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await authService.forgotPasswordService(req.body);

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await authService.resetPasswordService(req.body);

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await authService.verifyEmailService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

 export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
    }

    const response = await authService.changePasswordService(
      userId,
      req.body
    );

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};