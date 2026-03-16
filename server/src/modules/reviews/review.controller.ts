import { Request, Response, NextFunction } from "express";
import * as reviewService from "./review.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { REVIEW_MESSAGES } from "./review.constants";
import { HTTP_STATUS } from "../../constant/httpStatus";
import asyncHandler from "../../utils/AsyncHandler";
import {
  UpdateReviewDTO,
  CreateReviewDTO,
  GetReviewsQueryDTO,
} from "./review.dto";
import { getParam } from "../../utils/getParams";

export const createReview = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const data: CreateReviewDTO = req.body;

    const review = await reviewService.createReviewServices(data, userId);

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(HTTP_STATUS.CREATED, review, REVIEW_MESSAGES.CREATED),
      );
  },
);

export const getAllReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const query: GetReviewsQueryDTO = req.query as any;
    const reviews = await reviewService.getAllReviewsService(query);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, reviews, REVIEW_MESSAGES.FETCHED));
  },
);

export const updateReview = asyncHandler(
  async (req: Request, res: Response) => {
    const reviewId = getParam(req.params.id);
    const userId = (req as any).user?.userId;
    const data: UpdateReviewDTO = req.body;

    const review = await reviewService.updateReviewService(
      reviewId,
      userId,
      data,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, review, REVIEW_MESSAGES.UPDATED));
  },
);

export const deleteReview = asyncHandler(
  async (req: Request, res: Response) => {
    const reviewId = getParam(req.params.id);
    const userId = (req as any).user?.userId;

    const review = await reviewService.deleteReviewService(reviewId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, review, REVIEW_MESSAGES.DELETED));
  },
);
