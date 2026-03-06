export const LECTURE_CONSTANTS = {
  TITLE_MIN: 3,
  TITLE_MAX: 150,
  DESCRIPTION_MAX: 2000,
  MAX_RESOURCES: 10,
  MAX_RESOURCE_TITLE: 100,
};

export const LECTURE_MESSAGES = {
  CREATED: "Lecture created successfully",
  UPDATED: "Lecture updated successfully",
  DELETED: "Lecture deleted successfully",
  FETCHED: "Lecture fetched successfully",
  FETCHED_ALL: "Lectures fetched successfully",
  PUBLISHED: "Lecture published successfully",
  UNPUBLISHED: "Lecture unpublished successfully",
  REORDERED: "Lectures reordered successfully",

  // Errors
  NOT_FOUND: "Lecture not found",
  NOT_AUTHORIZED: "You are not authorized to modify this lecture",
  COURSE_NOT_FOUND: "Course not found",
  SECTION_NOT_FOUND: "Section not found in this course",
  VIDEO_REQUIRED: "Video is required for video type lecture",
};