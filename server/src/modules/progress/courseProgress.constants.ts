export const PROGRESS_CONSTANTS = {
  MIN_WATCH_PERCENTAGE: 80,  
  CERTIFICATE_THRESHOLD: 80,  
  INACTIVITY_DAYS: 30,
  PROGRESS_UPDATE_INTERVAL: 10,  
  VIDEO_SEEK_TOLERANCE: 30, 
};

export const PROGRESS_MESSAGES = {
  UPDATED: "Progress updated successfully",
  LECTURE_COMPLETED: "Lecture completed",
  SECTION_COMPLETED: "Section completed",
  COURSE_COMPLETED: "Congratulations! Course completed",
  NOT_FOUND: "Progress not found",
  INVALID_LECTURE: "Invalid lecture ID",
  ALREADY_COMPLETED: "Lecture already completed",
  CERTIFICATE_ELIGIBLE: "You are now eligible for certificate",
};

export const PROGRESS_MILESTONES = {
  25: "Keep going! You've completed 25% of the course",
  50: "Halfway there! You're doing great",
  75: "Almost done! Only 25% left",
  100: "Course completed! Claim your certificate",
};
