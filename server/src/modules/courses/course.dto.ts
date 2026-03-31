export interface CreateCourseDTO {
  title: string;
  subtitle?: string;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  price: number;
  discountedPrice?: number;
  level: string;
  language: string;
  categoryId: string;
  instituteId: string;
  curriculum: Array<{
    sectionTitle: string;
    sectionOrder: number;
    lectures: Array<{
      lectureTitle: string;
      lectureOrder: number;
      videoUrl?: string;
      videoDuration?: number;
      content?: string;
      resources?: Array<{
        title: string;
        url: string;
        type: string;
      }>;
      isFree: boolean;
    }>;
  }>;
  learningOutcomes: string[];
  prerequisites: string[];
  requirements: string[];
  tags: string[];
  certificateEnabled: boolean;
}

export interface UpdateCourseDTO {
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  previewVideo?: string;
  price?: number;
  discountedPrice?: number;
  level?: string;
  language?: string;
  categoryId?: string;
  curriculum?: Array<{
    sectionTitle: string;
    sectionOrder: number;
    lectures: Array<{
      lectureTitle: string;
      lectureOrder: number;
      videoUrl?: string;
      videoDuration?: number;
      content?: string;
      resources?: Array<{
        title: string;
        url: string;
        type: string;
      }>;
      isFree: boolean;
    }>;
  }>;
  learningOutcomes?: string[];
  prerequisites?: string[];
  requirements?: string[];
  tags?: string[];
  certificateEnabled?: boolean;
}

export interface GetCoursesQueryDTO {
  categoryId?: string;
  instituteId?: string;
  instructorId?: string;
  level?: string;
  language?: string;
  status?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
