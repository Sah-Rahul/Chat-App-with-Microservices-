export interface CreateReviewDTO {
  courseSlug: string;  
  comment: string;
  rating: number;
}

export interface UpdateReviewDTO {
  comment?: string;
  rating?: number;
}

export interface GetReviewsQueryDTO {
  courseSlug?: string;
  userId?: string;
  status?: string;
  rating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}