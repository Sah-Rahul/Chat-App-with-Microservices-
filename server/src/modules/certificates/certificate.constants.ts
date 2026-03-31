export const CERTIFICATE_CONSTANTS = {
  CERTIFICATE_PREFIX: "CERT",
  MIN_COMPLETION_PERCENTAGE: 80,
  GENERATION_DELAY: 2 * 60 * 60 * 1000,
  CERTIFICATE_VALIDITY: 0,
  PDF_QUALITY: "high",
  PDF_FORMAT: "A4",
  WATERMARK_OPACITY: 0.1,
  QR_CODE_SIZE: 200,
  MAX_DOWNLOAD_LIMIT: 0,
};

export const CERTIFICATE_MESSAGES = {
  GENERATED: "Certificate generated successfully",
  ISSUED: "Certificate issued successfully",
  REVOKED: "Certificate revoked",
  NOT_FOUND: "Certificate not found",
  NOT_ELIGIBLE: "You are not eligible for certificate yet",
  ALREADY_ISSUED: "Certificate already issued",
  VERIFICATION_SUCCESS: "Certificate verified successfully",
  VERIFICATION_FAILED: "Certificate verification failed",
  DOWNLOAD_SUCCESS: "Certificate downloaded successfully",
  SHARED_SUCCESS: "Certificate shared successfully",
};

export const CERTIFICATE_TEMPLATES = {
  DEFAULT: "default-template",
  MODERN: "modern-template",
  CLASSIC: "classic-template",
  ELEGANT: "elegant-template",
};
