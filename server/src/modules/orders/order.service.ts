import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import { CreateOrderDTO, GetOrdersQueryDTO } from "./order.dto";
import { OrderStatus, OrderType } from "./order.enums";
import OrderModel from "./order.model";
import CourseModel from "../courses/course.model";
import { ORDER_CONSTANTS, ORDER_MESSAGES } from "./order.constants";

export const createOrder = async (data: CreateOrderDTO, userId: string) => {
  const courseIds = data.items.map((i) => i.courseId);

  const courses = await CourseModel.find({ _id: { $in: courseIds } });

  if (courses.length !== courseIds.length) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "One or more courses not found");
  }

  // TODO: enrollment check — already purchased courses filter karna

  const items = courses.map((course) => ({
    courseId: course._id,
    courseName: course.title,
    coursePrice: course.price,
    discountedPrice: course.discountedPrice,
    finalPrice: course.discountedPrice ?? course.price,
  }));

  const subtotal = items.reduce((acc, item) => acc + item.finalPrice, 0);

  const tax = Math.round((subtotal * ORDER_CONSTANTS.TAX_RATE) / 100);
  const total = subtotal + tax;

  const order = await OrderModel.create({
    userId,
    items,
    subtotal,
    tax,
    total,
    currency: "INR",
    status: OrderStatus.PENDING,
    type: OrderType.COURSE_PURCHASE,
  });

  return order;
};

export const getAllOrders = async (query: GetOrdersQueryDTO) => {
  const {
    userId,
    status,
    startDate,
    endDate,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filter: Record<string, any> = {};

  if (userId) filter.userId = userId;
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = startDate;
    if (endDate) filter.createdAt.$lte = endDate;
  }

  const sortOptions: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("userId", "firstName lastName email"),
    OrderModel.countDocuments(filter),
  ]);

  return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getOrderById = async (orderId: string, userId?: string) => {
  const order = await OrderModel.findById(orderId)
    .populate("userId", "firstName lastName email")
    .populate("items.courseId", "title thumbnail slug");

  if (!order) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, ORDER_MESSAGES.NOT_FOUND);
  }

  if (userId && order.userId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Access denied");
  }

  return order;
};

export const getMyOrders = async (
  userId: string,
  query: GetOrdersQueryDTO = {},
) => {
  const { status, page = 1, limit = 10 } = query;

  const filter: Record<string, any> = { userId };
  if (status) filter.status = status;

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("items.courseId", "title thumbnail slug discountedPrice"),
    OrderModel.countDocuments(filter),
  ]);

  return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getOrderStatistics = async (filters: {
  startDate?: Date;
  endDate?: Date;
}) => {
  const matchStage: Record<string, any> = {};

  if (filters.startDate || filters.endDate) {
    matchStage.createdAt = {};
    if (filters.startDate) matchStage.createdAt.$gte = filters.startDate;
    if (filters.endDate) matchStage.createdAt.$lte = filters.endDate;
  }

  const stats = await OrderModel.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $cond: [{ $eq: ["$status", OrderStatus.COMPLETED] }, "$total", 0],
          },
        },
        totalTax: {
          $sum: {
            $cond: [{ $eq: ["$status", OrderStatus.COMPLETED] }, "$tax", 0],
          },
        },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ["$status", OrderStatus.PENDING] }, 1, 0] },
        },
        completedOrders: {
          $sum: { $cond: [{ $eq: ["$status", OrderStatus.COMPLETED] }, 1, 0] },
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ["$status", OrderStatus.CANCELLED] }, 1, 0] },
        },
        avgOrderValue: { $avg: "$total" },
      },
    },
    {
      $project: {
        _id: 0,
        totalOrders: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] },
        totalTax: { $round: ["$totalTax", 2] },
        pendingOrders: 1,
        completedOrders: 1,
        cancelledOrders: 1,
        avgOrderValue: { $round: ["$avgOrderValue", 2] },
      },
    },
  ]);

  return (
    stats[0] ?? {
      totalOrders: 0,
      totalRevenue: 0,
      totalTax: 0,
      pendingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      avgOrderValue: 0,
    }
  );
};
