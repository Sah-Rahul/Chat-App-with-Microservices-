export interface AddToWishlistDTO {
  courseId: string;
  notifyOnDiscount?: boolean;
}

export interface UpdateWishlistItemDTO {
  notifyOnDiscount?: boolean;
}
