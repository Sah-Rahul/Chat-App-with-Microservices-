export const REVIEW_CONSTANTS = {
  MIN_COMMENT_LENGTH: 10,
  MAX_COMMENT_LENGTH: 1000,
  MIN_TITLE_LENGTH: 5,
  MAX_TITLE_LENGTH: 100,
  MAX_PROS: 5,
  MAX_CONS: 5,
  MAX_REPLIES: 10,
  AUTO_APPROVE_THRESHOLD: 4.0,  
  MODERATION_QUEUE_THRESHOLD: 2.0,  
  HELPFUL_COUNT_THRESHOLD: 10,  
};

export const REVIEW_MESSAGES = {
  CREATED: "Review submitted successfully",
  UPDATED: "Review updated successfully",
  DELETED: "Review deleted successfully", 
  UNAUTHORIZED: "Unauthorized",
  USER: "User not found",
  NOT_FOUND: "Review not found",
  ALREADY_REVIEWED: "You have already reviewed this",
  NOT_ENROLLED: "You must be enrolled to review this course", 
  REPORTED: "Review reported successfully",
};
