export interface CreateOrderDTO {
  items: Array<{
    courseId: string;
  }>;
  couponCode?: string;
}

export interface UpdateOrderDTO {
  status?: string;
  notes?: string;
}

export interface GetOrdersQueryDTO {
  userId?: string;
  status?: string;
  type?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
