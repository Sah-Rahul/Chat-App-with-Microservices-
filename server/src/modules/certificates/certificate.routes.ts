import express from "express";
import * as certificateController from "./certificate.controller";
import {
  generateCertificateSchema,
  getCertificatesQuerySchema,
  verifyCertificateSchema,
  shareCertificateSchema,
} from "./certificate.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "../users/user.enums";
import { authorize } from "../../middleware/authorized.middleware";

const certificateRoutes = express.Router();

certificateRoutes.post(
  "/generate",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(generateCertificateSchema),
  certificateController.generateCertificate,
);

// Get all certificates
certificateRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getCertificatesQuerySchema),
  certificateController.getAllCertificates,
);

certificateRoutes.get(
  "/my-certificates",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  certificateController.getMyCertificates,
);

certificateRoutes.get(
  "/verify/:certificateNumber",
  validate(verifyCertificateSchema),
  certificateController.verifyCertificate,
);

certificateRoutes.get(
  "/:id",
  isAuthenticated,
  certificateController.getCertificateById,
);

certificateRoutes.get(
  "/:id/download",
  isAuthenticated,
  certificateController.downloadCertificate,
);

certificateRoutes.post(
  "/:id/share",
  isAuthenticated,
  validate(shareCertificateSchema),
  certificateController.shareCertificate,
);

certificateRoutes.post(
  "/:id/revoke",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  certificateController.revokeCertificate,
);

certificateRoutes.post(
  "/:id/regenerate",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.STUDENT),
  certificateController.regenerateCertificate,
);

export default certificateRoutes;
