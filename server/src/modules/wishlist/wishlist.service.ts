import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import { AddToWishlistDTO } from "./wishlist.dto";
import WishlistModel from "./wishlist.model";
import CartModel from "../cart/cart.model";
import CourseModel from "../courses/course.model";
import { WISHLIST_CONSTANTS, WISHLIST_MESSAGES } from "./wishlist.constants";
import { CART_CONSTANTS } from "../cart/cart.constants";

export const getWishlist = async (userId: string) => {
  const wishlist = await WishlistModel.findOne({ userId }).populate(
    "items.courseId",
    "title thumbnail slug price discountedPrice level rating totalEnrollments",
  );

  if (!wishlist) {
    return { items: [], totalItems: 0 };
  }

  return wishlist;
};

export const addToWishlist = async (userId: string, data: AddToWishlistDTO) => {
  const course = await CourseModel.findById(data.courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Course not found");
  }

  let wishlist = await WishlistModel.findOne({ userId });

  if (!wishlist) {
    wishlist = await WishlistModel.create({ userId, items: [] });
  }

  const alreadyExists = wishlist.items.some(
    (item) => item.courseId.toString() === data.courseId,
  );
  if (alreadyExists) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      WISHLIST_MESSAGES.ALREADY_EXISTS,
    );
  }

  if (wishlist.items.length >= WISHLIST_CONSTANTS.MAX_ITEMS) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      WISHLIST_MESSAGES.MAX_LIMIT_REACHED,
    );
  }

  wishlist.items.push({
    courseId: course._id,
    addedAt: new Date(),
    notifyOnDiscount: data.notifyOnDiscount ?? true,
  });

  await wishlist.save();
  return wishlist;
};

export const removeFromWishlist = async (userId: string, courseId: string) => {
  const wishlist = await WishlistModel.findOne({ userId });

  if (!wishlist) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, WISHLIST_MESSAGES.NOT_FOUND);
  }

  const itemExists = wishlist.items.some(
    (item) => item.courseId.toString() === courseId,
  );
  if (!itemExists) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, WISHLIST_MESSAGES.NOT_FOUND);
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.courseId.toString() !== courseId,
  );

  await wishlist.save();
  return wishlist;
};

export const clearWishlist = async (userId: string) => {
  const wishlist = await WishlistModel.findOne({ userId });

  if (!wishlist) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, WISHLIST_MESSAGES.NOT_FOUND);
  }

  wishlist.items = [];
  await wishlist.save();
  return wishlist;
};

export const moveToCart = async (userId: string, courseId: string) => {
  const wishlist = await WishlistModel.findOne({ userId });

  if (!wishlist) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, WISHLIST_MESSAGES.NOT_FOUND);
  }

  const itemExists = wishlist.items.some(
    (item) => item.courseId.toString() === courseId,
  );
  if (!itemExists) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, WISHLIST_MESSAGES.NOT_FOUND);
  }

  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Course not found");
  }

  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    cart = await CartModel.create({
      userId,
      items: [],
      expiresAt: new Date(Date.now() + CART_CONSTANTS.CART_EXPIRY),
    });
  }

  const alreadyInCart = cart.items.some(
    (item) => item.courseId.toString() === courseId,
  );

  if (!alreadyInCart) {
    if (cart.items.length >= CART_CONSTANTS.MAX_ITEMS) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Cart is full");
    }

    cart.items.push({
      courseId: course._id,
      courseName: course.title,
      coursePrice: course.price,
      discountedPrice: course.discountedPrice,
      thumbnail: course.thumbnail?.url,
      addedAt: new Date(),
    });

    cart.expiresAt = new Date(Date.now() + CART_CONSTANTS.CART_EXPIRY);
    await cart.save();
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.courseId.toString() !== courseId,
  );
  await wishlist.save();

  return { wishlist, cart };
};

export const getWishlistCount = async (userId: string) => {
  const wishlist = await WishlistModel.countDocuments({ userId });
  return wishlist;
};
