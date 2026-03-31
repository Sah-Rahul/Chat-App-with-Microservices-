export interface CreateCouponDTO {
  code: string;
  description?: string;
  type: string;
  discountType: string;
  discountValue: number;
  maxDiscount?: number;
  minPurchaseAmount: number;
  applicableOn: {
    courses?: string[];
    categories?: string[];
    institutes?: string[];
    allCourses?: boolean;
  };
  usageLimit?: {
    total?: number;
    perUser?: number;
  };
  validFrom: Date;
  validUntil: Date;
  restrictions?: {
    firstPurchaseOnly?: boolean;
    newUsersOnly?: boolean;
    minCoursesInCart?: number;
    excludedCourses?: string[];
  };
}

export interface UpdateCouponDTO {
  description?: string;
  discountValue?: number;
  maxDiscount?: number;
  minPurchaseAmount?: number;
  usageLimit?: {
    total?: number;
    perUser?: number;
  };
  validFrom?: Date;
  validUntil?: Date;
  status?: string;
}

export interface ValidateCouponDTO {
  code: string;
  userId: string;
  courseIds: string[];
  totalAmount: number;
}

export interface GetCouponsQueryDTO {
  type?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
