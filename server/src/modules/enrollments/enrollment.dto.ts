export interface CreateEnrollmentDTO {
  courseId: string;
  orderId?: string;
  type: string;
  validity?: number;
}

export interface UpdateEnrollmentDTO {
  status?: string;
  validity?: number;
}

export interface GetEnrollmentsQueryDTO {
  userId?: string;
  courseId?: string;
  instituteId?: string;
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
