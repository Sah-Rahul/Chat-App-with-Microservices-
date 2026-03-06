import { Request, Response } from "express";
import * as cartService from "./cart.service";
import asyncHandler from "../../utils/AsyncHandler";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { CART_MESSAGES } from "./cart.constants";
import { getParam } from "../../utils/getParams";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  const cart = await cartService.getCart(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, cart, "Cart fetched successfully"));
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  const cart = await cartService.addToCart(userId, req.body);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, cart, CART_MESSAGES.ADDED));
});

export const removeFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId; 
    const courseId = getParam(req.params.id);

    const cart = await cartService.removeFromCart(userId, courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, cart, CART_MESSAGES.REMOVED));
  },
);

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  const cart = await cartService.clearCart(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, cart, CART_MESSAGES.CLEARED));
});

export const moveToWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.id);

    const cart = await cartService.moveToWishlist(userId, courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, cart, "Moved to wishlist"));
  },
);

export const getCartCount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    const result = await cartService.getCartCount(userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, result, "Cart count fetched"));
  },
);