import express from "express";
import * as orderController from "./order.controller";
import {
  createOrderSchema,
  updateOrderSchema,
  getOrdersQuerySchema,
} from "./order.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "../users/user.enums";
import { authorize } from "../../middleware/authorized.middleware";

const orderRoutes = express.Router();

orderRoutes.post(
  "/",
  isAuthenticated,
  validate(createOrderSchema),
  orderController.createOrder,
);

orderRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(getOrdersQuerySchema),
  orderController.getAllOrders,
);

orderRoutes.get("/my-orders", isAuthenticated, orderController.getMyOrders);

orderRoutes.get("/:id", isAuthenticated, orderController.getOrderById);

orderRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(updateOrderSchema),
  orderController.updateOrder,
);

orderRoutes.post("/:id/cancel", isAuthenticated, orderController.cancelOrder);

orderRoutes.get(
  "/statistics/overview",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  orderController.getOrderStatistics,
);

export default orderRoutes;
