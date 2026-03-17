import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import CourseModel from "../courses/course.model";
import EnrollmentModel from "../enrollments/enrollment.model";
import ReviewModel from "./review.model";
import {
  CreateReviewDTO,
  UpdateReviewDTO,
  GetReviewsQueryDTO,
} from "./review.dto";
import { REVIEW_CONSTANTS, REVIEW_MESSAGES } from "./review.constants";
import { ReviewType } from "./review.enums";

export const createReviewServices = async (
  data: CreateReviewDTO,
  userId: string,
) => {
  if (!userId)
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, REVIEW_MESSAGES.UNAUTHORIZED);

  if (
    !data.comment ||
    data.comment.length < REVIEW_CONSTANTS.MIN_COMMENT_LENGTH
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Comment must be between ${REVIEW_CONSTANTS.MIN_COMMENT_LENGTH} and ${REVIEW_CONSTANTS.MAX_COMMENT_LENGTH} characters`,
    );
  }

  const course = await CourseModel.findOne({ slug: data.courseSlug });
  if (!course) throw new ApiError(HTTP_STATUS.NOT_FOUND, "Course not found");

  const enrolled = await EnrollmentModel.findOne({
    user: userId,
    course: course._id,
  });
  if (!enrolled)
    throw new ApiError(HTTP_STATUS.FORBIDDEN, REVIEW_MESSAGES.NOT_ENROLLED);

  const existingReview = await ReviewModel.findOne({
    userId,
    courseId: course._id,
  });
  if (existingReview)
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      REVIEW_MESSAGES.ALREADY_REVIEWED,
    );

  const review = await ReviewModel.create({
    userId,
    type: ReviewType.COURSE,
    courseId: course._id,
    comment: data.comment,
    rating: data.rating,
    isVerifiedPurchase: true,
  });

  course.totalReviews = (course.totalReviews || 0) + 1;
  await course.save();

  return review;
};

export const getAllReviewsService = async (query: GetReviewsQueryDTO) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    courseSlug,
  } = query;
  const skip = (Number(page) - 1) * Number(limit);

  let filter: any = {};
  if (courseSlug) {
    const course = await CourseModel.findOne({ slug: courseSlug });
    if (course) filter.courseId = course._id;
  }

  const total = await ReviewModel.countDocuments(filter);
  const reviews = await ReviewModel.find(filter)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate("userId", "firstName lastName avatar")  
    .populate("courseId", "title");

  return {
    data: reviews,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

export const updateReviewService = async (
  reviewId: string,
  userId: string,
  data: UpdateReviewDTO,
) => {
  if (!userId) throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");

  const review = await ReviewModel.findById(reviewId);
  if (!review)
    throw new ApiError(HTTP_STATUS.NOT_FOUND, REVIEW_MESSAGES.NOT_FOUND);
  if (review.userId.toString() !== userId)
    throw new ApiError(HTTP_STATUS.FORBIDDEN, REVIEW_MESSAGES.UNAUTHORIZED);

  if (data.comment !== undefined) review.comment = data.comment;
  if (data.rating !== undefined) review.rating = data.rating;

  await review.save();
  return review;
};

export const deleteReviewService = async (reviewId: string, userId: string) => {
  if (!userId)
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, REVIEW_MESSAGES.USER);

  const review = await ReviewModel.findById(reviewId);
  if (!review)
    throw new ApiError(HTTP_STATUS.NOT_FOUND, REVIEW_MESSAGES.NOT_FOUND);
  if (review.userId.toString() !== userId)
    throw new ApiError(HTTP_STATUS.FORBIDDEN, REVIEW_MESSAGES.NOT_AUTHORIZED);

  const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
  if (!deletedReview)
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      REVIEW_MESSAGES.NOT_DELETED,
    );

  return deletedReview;
};
