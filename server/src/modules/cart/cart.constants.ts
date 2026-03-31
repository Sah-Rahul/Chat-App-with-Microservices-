export const CART_CONSTANTS = {
  MAX_ITEMS: 20,  
  CART_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  ABANDONED_CART_REMINDER: 24 * 60 * 60 * 1000,  
  PRICE_CHANGE_TOLERANCE: 5, 
};

export const CART_MESSAGES = {
  ADDED: "Course added to cart",
  REMOVED: "Course removed from cart",
  UPDATED: "Cart updated successfully",
  CLEARED: "Cart cleared",
  ALREADY_EXISTS: "Course already in cart",
  NOT_FOUND: "Cart item not found",
  EMPTY_CART: "Your cart is empty",
  MAX_LIMIT_REACHED: "Cart is full. Maximum 20 items allowed.",
  COUPON_APPLIED: "Coupon applied successfully",
  COUPON_REMOVED: "Coupon removed",
  INVALID_COUPON: "Invalid or expired coupon",
  PRICE_CHANGED: "Price has changed since you added this to cart",
};
