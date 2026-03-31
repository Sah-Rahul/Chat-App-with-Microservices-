export interface CreatePaymentDTO {
  orderId: string;
  amount: number;
  method: string;
  gateway: string;
}

export interface VerifyPaymentDTO {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface RefundPaymentDTO {
  paymentId: string;
  amount?: number;
  reason: string;
}

export interface GetPaymentsQueryDTO {
  userId?: string;
  orderId?: string;
  status?: string;
  method?: string;
  gateway?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
