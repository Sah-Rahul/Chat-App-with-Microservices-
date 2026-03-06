import express from "express";
import * as paymentController from "./payment.controller";
import {
  createPaymentSchema,
  verifyPaymentSchema,
  getPaymentsQuerySchema,
} from "./payment.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "../users/user.enums";
import { authorize } from "../../middleware/authorized.middleware";

const paymentRoutes = express.Router();

// ─── Webhook — express.raw() zaroori hai Stripe signature verify ke liye ──────
// IMPORTANT: yeh route sabse upar hona chahiye, JSON middleware se pehle
paymentRoutes.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook,
);

 
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

paymentRoutes.get("/:id", isAuthenticated, paymentController.getPaymentById);

 
paymentRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(getPaymentsQuerySchema),
  paymentController.getAllPayments,
);

paymentRoutes.get(
  "/statistics/overview",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  paymentController.getPaymentStatistics,
);

export default paymentRoutes;