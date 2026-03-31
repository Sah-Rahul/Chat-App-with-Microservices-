export interface GenerateCertificateDTO {
  userId: string;
  courseId: string;
  enrollmentId: string;
}

export interface GetCertificatesQueryDTO {
  userId?: string;
  courseId?: string;
  instituteId?: string;
  status?: string;
  type?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface VerifyCertificateDTO {
  certificateNumber: string;
}

export interface ShareCertificateDTO {
  platform: string;
}
