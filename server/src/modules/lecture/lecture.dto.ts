import { ResourceType } from "./lecture.enums";

export interface ResourceDTO {
  title: string;
  url: string;
  type: ResourceType;
}

export interface CreateLectureDTO {
  courseId: string;
  sectionId: string;
  title: string;
  description?: string;
  isPreview: boolean;
  resources?: ResourceDTO[];
}

export interface UpdateLectureDTO {
  title?: string;
  description?: string;
  isPreview?: boolean;
  resources?: ResourceDTO[];
}

export interface ReorderLecturesDTO {
  lectures: {
    lectureId: string;
    order: number;
  }[];
}