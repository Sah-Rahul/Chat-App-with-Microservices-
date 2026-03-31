import express from "express";
import * as wishlistController from "./wishlist.controller";
import {
  addToWishlistSchema,
  updateWishlistItemSchema,
  removeFromWishlistSchema,
} from "./wishlist.zod";
import { validate } from "../../middleware/validate.middleware";
import { isAuthenticated } from "../../middleware/auth.middleware";

const wishlistRoutes = express.Router();

wishlistRoutes.get("/", isAuthenticated, wishlistController.getWishlist);

wishlistRoutes.get(
  "/count",
  isAuthenticated,
  wishlistController.getWishlistCount,
);

wishlistRoutes.get(
  "/check/:courseId",
  isAuthenticated,
  validate(removeFromWishlistSchema),
  wishlistController.checkInWishlist,
);

wishlistRoutes.post(
  "/add",
  isAuthenticated,
  validate(addToWishlistSchema),
  wishlistController.addToWishlist,
);

wishlistRoutes.delete(
  "/remove/:courseId",
  isAuthenticated,
  validate(removeFromWishlistSchema),
  wishlistController.removeFromWishlist,
);

wishlistRoutes.delete(
  "/clear",
  isAuthenticated,
  wishlistController.clearWishlist,
);

wishlistRoutes.patch(
  "/:courseId",
  isAuthenticated,
  validate(updateWishlistItemSchema),
  wishlistController.updateWishlistItem,
);

wishlistRoutes.post(
  "/move-to-cart/:courseId",
  isAuthenticated,
  validate(removeFromWishlistSchema),
  wishlistController.moveToCart,
);

export default wishlistRoutes;
