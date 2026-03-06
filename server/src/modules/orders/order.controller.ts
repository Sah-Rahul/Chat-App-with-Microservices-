import { Request, Response } from "express";
import * as orderService from "./order.service";
import asyncHandler from "../../utils/AsyncHandler";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { ORDER_MESSAGES } from "./order.constants";
import { GetOrdersQueryDTO } from "./order.dto";
import { getParam } from "../../utils/getParams";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

  const order = await orderService.createOrder(req.body, userId);

  res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, order, ORDER_MESSAGES.CREATED));
});

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as unknown as GetOrdersQueryDTO;

    const result = await orderService.getAllOrders(query);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, result, "Orders fetched successfully"),
      );
  },
);

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const query = req.query as unknown as GetOrdersQueryDTO;

  const result = await orderService.getMyOrders(userId, query);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        result,
        "Your orders fetched successfully",
      ),
    );
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const orderId = getParam(req.params.id);

    const order = await orderService.getOrderById(orderId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, order, "Order fetched successfully"),
      );
  },
);

export const getOrderStatistics = asyncHandler(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    const stats = await orderService.getOrderStatistics({
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
