import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import { AddToCartDTO } from "./cart.dto";
import CartModel from "./cart.model";
import CourseModel from "../courses/course.model";
import { CART_CONSTANTS, CART_MESSAGES } from "./cart.constants";

// ─── Get Cart ─────────────────────────────────────────────────────────────────
export const getCart = async (userId: string) => {
  let cart = await CartModel.findOne({ userId }).populate(
    "items.courseId",
    "title thumbnail slug level",
  );

  // Cart nahi hai — empty cart return karo
  if (!cart) {
    return {
      items: [],
      subtotal: 0,
      total: 0,
      totalItems: 0,
    };
  }

  return cart;
};

// ─── Add To Cart ──────────────────────────────────────────────────────────────
export const addToCart = async (userId: string, data: AddToCartDTO) => {
  const course = await CourseModel.findById(data.courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Course not found");
  }

  if (!course.coursePublish) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Course is not available");
  }

  // TODO: enrollment check — already purchased course cart mein nahi jayega

  let cart = await CartModel.findOne({ userId });

  // Cart nahi hai — naya create karo
  if (!cart) {
    cart = await CartModel.create({
      userId,
      items: [],
      expiresAt: new Date(Date.now() + CART_CONSTANTS.CART_EXPIRY),
    });
  }

  // Already in cart check
  const alreadyExists = cart.items.some(
    (item) => item.courseId.toString() === data.courseId,
  );
  if (alreadyExists) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, CART_MESSAGES.ALREADY_EXISTS);
  }

  // Max items check
  if (cart.items.length >= CART_CONSTANTS.MAX_ITEMS) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, CART_MESSAGES.MAX_LIMIT_REACHED);
  }

  cart.items.push({
    courseId: course._id,
    courseName: course.title,
    coursePrice: course.price,
    discountedPrice: course.discountedPrice,
    thumbnail: course.thumbnail?.url,
    addedAt: new Date(),
  });

  // Cart expiry refresh karo
  cart.expiresAt = new Date(Date.now() + CART_CONSTANTS.CART_EXPIRY);

  await cart.save();
  return cart;
};

// ─── Remove From Cart ─────────────────────────────────────────────────────────
export const removeFromCart = async (userId: string, courseId: string) => {
  const cart = await CartModel.findOne({ userId });

  if (!cart) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CART_MESSAGES.EMPTY_CART);
  }

  const itemExists = cart.items.some(
    (item) => item.courseId.toString() === courseId,
  );
  if (!itemExists) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CART_MESSAGES.NOT_FOUND);
  }

  cart.items = cart.items.filter(
    (item) => item.courseId.toString() !== courseId,
  );

  await cart.save();
  return cart;
};

// ─── Clear Cart ───────────────────────────────────────────────────────────────
export const clearCart = async (userId: string) => {
  const cart = await CartModel.findOne({ userId });

  if (!cart) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CART_MESSAGES.EMPTY_CART);
  }

  cart.items = [];
  cart.couponCode = undefined;
  cart.couponDiscount = 0;
  cart.discount = 0;

  await cart.save();
  return cart;
};

// ─── Move To Wishlist ─────────────────────────────────────────────────────────
export const moveToWishlist = async (userId: string, courseId: string) => {
  const cart = await CartModel.findOne({ userId });

  if (!cart) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CART_MESSAGES.EMPTY_CART);
  }

  const itemExists = cart.items.some(
    (item) => item.courseId.toString() === courseId,
  );
  if (!itemExists) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CART_MESSAGES.NOT_FOUND);
  }

  // Cart se remove karo
  cart.items = cart.items.filter(
    (item) => item.courseId.toString() !== courseId,
  );

  await cart.save();

  // TODO: Wishlist model mein add karo jab wishlist module banega

  return cart;
};

// ─── Get Cart Count ───────────────────────────────────────────────────────────
export const getCartCount = async (userId: string) => {
  const cart = await CartModel.findOne({ userId });
  return { count: cart?.items.length ?? 0 };
};