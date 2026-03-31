import { Request, Response, NextFunction } from "express";
import * as reviewService from "./review.service";
import UserModel from "../users/user.model";
import { ApiResponse } from "../../utils/ApiResponse";
import { REVIEW_MESSAGES } from "./review.constants";

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const comment = req.body;

    const review = await reviewService.createReviewServices(comment, userId);
    res.status(200).json(new ApiResponse(200, review, REVIEW_MESSAGES.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Implement
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Implement
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Implement
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Implement
  } catch (error) {
    next(error);
  }
};

export const addReply = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Implement
  } catch (error) {
    next(error);
  }
};
