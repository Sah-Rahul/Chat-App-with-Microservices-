import express from "express";
import * as wishlistController from "./wishlist.controller";

import { validate } from "../../middleware/validate.middleware";
import { isAuthenticated } from "../../middleware/auth.middleware";

const wishlistRoutes = express.Router();

wishlistRoutes.get("/", isAuthenticated, wishlistController.getWishlist);

wishlistRoutes.get(
  "/count",
  isAuthenticated,
  wishlistController.getWishlistCount,
);

wishlistRoutes.post("/add", isAuthenticated, wishlistController.addToWishlist);

wishlistRoutes.delete(
  "/remove/:courseId",
  isAuthenticated,
  wishlistController.removeFromWishlist,
);

wishlistRoutes.delete(
  "/clear",
  isAuthenticated,
  wishlistController.clearWishlist,
);

wishlistRoutes.post(
  "/move-to-cart/:courseId",
  isAuthenticated,
  wishlistController.moveToCart,
);

export default wishlistRoutes;
