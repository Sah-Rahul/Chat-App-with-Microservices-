export interface CreateEnrollmentDTO {
  courseId: string;
  orderId?: string;
  type?: string;
  validity?: number;
}

export interface UpdateEnrollmentDTO {
  progress?: number;           // ✅ ADD
  completedLectures?: number;  // ✅ ADD
}

export interface GetEnrollmentsQueryDTO {
  userId?: string;
  courseId?: string;
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}