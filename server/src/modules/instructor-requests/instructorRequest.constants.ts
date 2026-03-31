export const INSTRUCTOR_REQUEST_CONSTANTS = {
  MIN_BIO_LENGTH: 100,
  MAX_BIO_LENGTH: 2000,
  MIN_EXPERIENCE_YEARS: 0,
  MAX_QUALIFICATIONS: 10,
  MAX_WORK_EXPERIENCE: 20,
  MAX_ACHIEVEMENTS: 15,
  MAX_SAMPLE_CONTENT: 5,
  MAX_DOCUMENTS: 10,
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "image/jpeg", "image/png"],
  MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
};

export const INSTRUCTOR_REQUEST_MESSAGES = {
  SUBMITTED: "Instructor application submitted successfully",
  APPROVED: "Instructor application approved",
  REJECTED: "Instructor application rejected",
  CANCELLED: "Instructor application cancelled",
  INTERVIEW_SCHEDULED: "Interview scheduled successfully",
  NOT_FOUND: "Instructor request not found",
  ALREADY_APPLIED: "You have already applied to become an instructor",
  ALREADY_INSTRUCTOR: "You are already an instructor",
  INCOMPLETE_PROFILE: "Please complete all required fields",
};
