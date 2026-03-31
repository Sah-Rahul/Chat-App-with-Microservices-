import { ApiError } from "../../utils/ApiError";
import {
  CreateReviewDTO,
  UpdateReviewDTO,
  GetReviewsQueryDTO,
} from "./review.dto";

export const createReviewServices = async (data: CreateReviewDTO, userId: string) => {
  // TODO: Create review
};

export const getAllReviews = async (query: GetReviewsQueryDTO) => {
  // TODO: Get all reviews
};

export const getReviewById = async (reviewId: string) => {
  // TODO: Get review by ID
};

export const updateReview = async (
  reviewId: string,
  data: UpdateReviewDTO,
  userId: string,
) => {
  // TODO: Update review
};

export const deleteReview = async (reviewId: string, userId: string) => {
  // TODO: Delete review
};

export const addReply = async (
  reviewId: string,
  comment: string,
  userId: string,
) => {
  // TODO: Add reply to review
};
