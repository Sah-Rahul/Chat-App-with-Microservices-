export interface UpdateProgressDTO {
  sectionId: string;
  lectureId: string;
  watchedDuration: number;
  totalDuration: number;
}

export interface MarkLectureCompleteDTO {
  sectionId: string;
  lectureId: string;
}

export interface GetProgressQueryDTO {
  userId?: string;
  courseId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
