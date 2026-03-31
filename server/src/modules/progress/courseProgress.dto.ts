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

export interface UpdateQuizScoreDTO {
  quizId: string;
  score: number;
  maxScore: number;
}

export interface UpdateAssignmentScoreDTO {
  assignmentId: string;
  score: number;
  maxScore: number;
}

export interface GetProgressQueryDTO {
  userId?: string;
  courseId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
