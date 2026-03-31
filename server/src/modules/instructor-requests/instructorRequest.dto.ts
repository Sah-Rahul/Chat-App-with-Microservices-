export interface CreateInstructorRequestDTO {
  instituteId?: string;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
  experienceYears: number;
  expertiseLevel: string;
  qualifications: Array<{
    degree: string;
    institution: string;
    year: number;
    field: string;
  }>;
  workExperience: Array<{
    designation: string;
    company: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  }>;
  achievements?: string[];
  socialLinks?: {
    linkedin?: string;
    youtube?: string;
    github?: string;
    portfolio?: string;
    other?: string;
  };
  sampleContent?: Array<{
    type: "video" | "article" | "project";
    title: string;
    url: string;
  }>;
  documents: Array<{
    type: string;
    name: string;
    url: string;
  }>;
}

export interface UpdateInstructorRequestDTO {
  fullName?: string;
  phone?: string;
  bio?: string;
  expertise?: string[];
  experienceYears?: number;
  expertiseLevel?: string;
  qualifications?: Array<{
    degree: string;
    institution: string;
    year: number;
    field: string;
  }>;
  workExperience?: Array<{
    designation: string;
    company: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  }>;
  achievements?: string[];
  socialLinks?: {
    linkedin?: string;
    youtube?: string;
    github?: string;
    portfolio?: string;
    other?: string;
  };
  sampleContent?: Array<{
    type: string;
    title: string;
    url: string;
  }>;
  documents?: Array<{
    type: string;
    name: string;
    url: string;
  }>;
}

export interface ReviewInstructorRequestDTO {
  status: "approved" | "rejected";
  approvalNotes?: string;
  rejectionReason?: string;
}

export interface GetInstructorRequestsQueryDTO {
  status?: string;
  instituteId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
