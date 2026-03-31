import { AddToWishlistDTO, UpdateWishlistItemDTO } from "./wishlist.dto";

export const getWishlist = async (userId: string) => {
  // TODO: Get user's wishlist
};

export const addToWishlist = async (userId: string, data: AddToWishlistDTO) => {
  // TODO: Add course to wishlist
};

export const removeFromWishlist = async (userId: string, courseId: string) => {
  // TODO: Remove course from wishlist
};

export const clearWishlist = async (userId: string) => {
  // TODO: Clear entire wishlist
};

export const updateWishlistItem = async (
  userId: string,
  courseId: string,
  data: UpdateWishlistItemDTO,
) => {
  // TODO: Update wishlist item (notify settings)
};

export const moveToCart = async (userId: string, courseId: string) => {
  // TODO: Move item from wishlist to cart
};

export const checkInWishlist = async (userId: string, courseId: string) => {
  // TODO: Check if course is in wishlist
};

export const getWishlistCount = async (userId: string) => {
  // TODO: Get wishlist item count
};

export const notifyPriceDrops = async () => {
  // TODO: Notify users about price drops on wishlist items
};
