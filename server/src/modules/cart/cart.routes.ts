import express from "express";
import * as cartController from "./cart.controller";
import { addToCartSchema, removeFromCartSchema } from "./cart.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";

const cartRoutes = express.Router();

cartRoutes.get("/", isAuthenticated, cartController.getCart);
cartRoutes.get("/count", isAuthenticated, cartController.getCartCount);

cartRoutes.post(
  "/add",
  isAuthenticated,
  validate(addToCartSchema),
  cartController.addToCart,
);

cartRoutes.delete(
  "/remove/:courseId",
  isAuthenticated,
  validate(removeFromCartSchema),
  cartController.removeFromCart,
);

cartRoutes.delete("/clear", isAuthenticated, cartController.clearCart);

cartRoutes.post(
  "/move-to-wishlist/:courseId",
  isAuthenticated,
  validate(removeFromCartSchema),
  cartController.moveToWishlist,
);

export default cartRoutes;