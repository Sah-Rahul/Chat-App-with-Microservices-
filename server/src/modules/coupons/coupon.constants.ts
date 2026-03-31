export const COUPON_CONSTANTS = {
  CODE_MIN_LENGTH: 4,
  CODE_MAX_LENGTH: 20,
  MAX_PERCENTAGE_DISCOUNT: 100,
  MAX_FIXED_DISCOUNT: 100000,
  DEFAULT_USAGE_LIMIT_PER_USER: 1,
  AUTO_DEACTIVATE_ON_EXPIRY: true,
};

export const COUPON_MESSAGES = {
  CREATED: "Coupon created successfully",
  UPDATED: "Coupon updated successfully",
  DELETED: "Coupon deleted successfully",
  APPLIED: "Coupon applied successfully",
  NOT_FOUND: "Invalid coupon code",
  EXPIRED: "This coupon has expired",
  NOT_STARTED: "This coupon is not valid yet",
  USAGE_LIMIT_REACHED: "Coupon usage limit reached",
  USER_LIMIT_REACHED: "You have already used this coupon",
  MIN_PURCHASE_NOT_MET: "Minimum purchase amount not met",
  NOT_APPLICABLE: "This coupon is not applicable to your cart items",
  INACTIVE: "This coupon is currently inactive",
};
