import { AddToCartDTO, ApplyCouponDTO } from "./cart.dto";

export const getCart = async (userId: string) => {
  // TODO: Get user's cart
};

export const addToCart = async (userId: string, data: AddToCartDTO) => {
  // TODO: Add course to cart
};

export const removeFromCart = async (userId: string, courseId: string) => {
  // TODO: Remove course from cart
};

export const clearCart = async (userId: string) => {
  // TODO: Clear entire cart
};

export const applyCoupon = async (userId: string, data: ApplyCouponDTO) => {
  // TODO: Apply coupon to cart
};

export const removeCoupon = async (userId: string) => {
  // TODO: Remove coupon from cart
};

export const moveToWishlist = async (userId: string, courseId: string) => {
  // TODO: Move item from cart to wishlist
};

export const syncCart = async (userId: string, cartItems: any[]) => {
  // TODO: Sync cart items (for guest to logged in user)
};

export const getCartCount = async (userId: string) => {
  // TODO: Get cart item count
};
