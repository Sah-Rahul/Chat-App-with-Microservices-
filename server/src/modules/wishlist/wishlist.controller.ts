import { Request, Response } from "express";
import * as wishlistService from "./wishlist.service";
import asyncHandler from "../../utils/AsyncHandler";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { WISHLIST_MESSAGES } from "./wishlist.constants";
import { getParam } from "../../utils/getParams";

export const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  const wishlist = await wishlistService.getWishlist(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        wishlist,
        "Wishlist fetched successfully",
      ),
    );
});

export const addToWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    const wishlist = await wishlistService.addToWishlist(userId, req.body);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, wishlist, WISHLIST_MESSAGES.ADDED));
  },
);

export const removeFromWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.id);

    const wishlist = await wishlistService.removeFromWishlist(userId, courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, wishlist, WISHLIST_MESSAGES.REMOVED),
      );
  },
);

export const clearWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    const wishlist = await wishlistService.clearWishlist(userId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, wishlist, WISHLIST_MESSAGES.CLEARED),
      );
  },
);

export const moveToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const courseId = getParam(req.params.id);

  const result = await wishlistService.moveToCart(userId, courseId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, result, WISHLIST_MESSAGES.MOVED_TO_CART),
    );
});

export const getWishlistCount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    const result = await wishlistService.getWishlistCount(userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, result, "Wishlist count fetched"));
  },
);
