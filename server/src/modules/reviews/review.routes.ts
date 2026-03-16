import express from "express";
import * as reviewController from "./review.controller";
import {
  createReviewSchema,
  updateReviewSchema,
  getReviewsQuerySchema,
} from "./review.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";

const reviewRoutes = express.Router();

reviewRoutes.post(
  "/",
  isAuthenticated,
  validate(createReviewSchema),
  reviewController.createReview,
);

reviewRoutes.get(
  "/",
  validate(getReviewsQuerySchema),
  reviewController.getAllReviews,
);

reviewRoutes.put(
  "/:id",
  isAuthenticated,
  validate(updateReviewSchema),
  reviewController.updateReview,
);

reviewRoutes.delete("/:id", isAuthenticated, reviewController.deleteReview);

export default reviewRoutes;
