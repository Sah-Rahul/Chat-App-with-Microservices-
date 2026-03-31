import express from "express";
import * as couponController from "./coupon.controller";
import {
  createCouponSchema,
  updateCouponSchema,
  validateCouponSchema,
  getCouponsQuerySchema,
} from "./coupon.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";
import { validate } from "../../middleware/validate.middleware";

const couponRoutes = express.Router();

couponRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(createCouponSchema),
  couponController.createCoupon,
);

couponRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getCouponsQuerySchema),
  couponController.getAllCoupons,
);

couponRoutes.get("/public", couponController.getPublicCoupons);

couponRoutes.post(
  "/validate",
  isAuthenticated,
  validate(validateCouponSchema),
  couponController.validateCoupon,
);

couponRoutes.get(
  "/code/:code",
  isAuthenticated,
  couponController.getCouponByCode,
);

couponRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  couponController.getCouponById,
);

couponRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(updateCouponSchema),
  couponController.updateCoupon,
);

couponRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  couponController.deleteCoupon,
);

couponRoutes.patch(
  "/:id/deactivate",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  couponController.deactivateCoupon,
);

couponRoutes.get(
  "/:id/statistics",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  couponController.getCouponStatistics,
);

export default couponRoutes;
