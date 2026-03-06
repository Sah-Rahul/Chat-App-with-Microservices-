import { Request, Response } from "express";
import * as paymentService from "./payment.service";
import asyncHandler from "../../utils/AsyncHandler";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { PAYMENT_MESSAGES } from "./payment.constants";
import { GetPaymentsQueryDTO } from "./payment.dto";
import { getParam } from "../../utils/getParams";

export const createPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    const result = await paymentService.createPayment(req.body, userId);

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          result,
          PAYMENT_MESSAGES.INITIATED,
        ),
      );
  },
);

export const verifyPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    const result = await paymentService.verifyPayment(req.body, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, result, PAYMENT_MESSAGES.SUCCESS));
  },
);

export const handleWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"] as string;

    if (!signature) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Missing stripe-signature header" });
      return;
    }

    // req.body yahan raw Buffer hoga — express.raw() se
    const result = await paymentService.handleWebhook(req.body, signature);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          result,
          PAYMENT_MESSAGES.WEBHOOK_RECEIVED,
        ),
      );
  },
);

export const getPaymentById = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const PaymentId = getParam(req.params.id);
    const payment = await paymentService.getPaymentById(PaymentId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          payment,
          "Payment fetched successfully",
        ),
      );
  },
);

export const getAllPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as unknown as GetPaymentsQueryDTO;

    const result = await paymentService.getAllPayments(query);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          result,
          "Payments fetched successfully",
        ),
      );
  },
);

export const getPaymentStatistics = asyncHandler(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    const stats = await paymentService.getPaymentStatistics({
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          stats,
          "Statistics fetched successfully",
        ),
      );
  },
);
