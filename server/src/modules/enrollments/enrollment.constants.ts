export const ENROLLMENT_CONSTANTS = {
  DEFAULT_VALIDITY: 365,
  LIFETIME_VALIDITY: 0,
  MIN_COMPLETION_PERCENTAGE: 80,
  CERTIFICATE_GENERATION_DELAY: 2 * 60 * 60 * 1000,
  INACTIVITY_WARNING_DAYS: 30,
  AUTO_EXPIRE_CHECK_INTERVAL: 24 * 60 * 60 * 1000,
};

export const ENROLLMENT_MESSAGES = {
  CREATED: "Enrolled successfully",
  COMPLETED: "Course completed successfully",
  EXPIRED: "Enrollment has expired",
  REVOKED: "Enrollment access revoked",
  NOT_FOUND: "Enrollment not found",
  ALREADY_ENROLLED: "Already enrolled in this course",
  CERTIFICATE_GENERATED: "Certificate generated successfully",
  PROGRESS_UPDATED: "Progress updated successfully",
};
