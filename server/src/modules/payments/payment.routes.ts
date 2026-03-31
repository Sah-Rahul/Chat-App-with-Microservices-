import express from "express";
import * as paymentController from "./payment.controller";
import {
  createPaymentSchema,
  verifyPaymentSchema,
  refundPaymentSchema,
  getPaymentsQuerySchema,
} from "./payment.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "../users/user.enums";
import { authorize } from "../../middleware/authorized.middleware";

const paymentRoutes = express.Router();

paymentRoutes.post(
  "/",
  isAuthenticated,
  validate(createPaymentSchema),
  paymentController.createPayment,
);

paymentRoutes.post(
  "/verify",
  isAuthenticated,
  validate(verifyPaymentSchema),
  paymentController.verifyPayment,
);

paymentRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(getPaymentsQuerySchema),
  paymentController.getAllPayments,
);

paymentRoutes.get("/:id", isAuthenticated, paymentController.getPaymentById);

paymentRoutes.post(
  "/:paymentId/refund",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(refundPaymentSchema),
  paymentController.refundPayment,
);

paymentRoutes.get(
  "/statistics/overview",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  paymentController.getPaymentStatistics,
);

paymentRoutes.post("/webhook", paymentController.handleWebhook);

export default paymentRoutes;
