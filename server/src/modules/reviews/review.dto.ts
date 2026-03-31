import { ReviewType } from "./review.enums";

export interface CreateReviewDTO {
  type: ReviewType.COURSE | ReviewType.INSTITUTE; 
  courseId?: string;
  instituteId?: string; 
  comment: string; 
}

export interface UpdateReviewDTO {
  rating?: number;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
}

export interface GetReviewsQueryDTO {
  type?: string;
  courseId?: string;
  instituteId?: string;
  userId?: string;
  status?: string;
  rating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
