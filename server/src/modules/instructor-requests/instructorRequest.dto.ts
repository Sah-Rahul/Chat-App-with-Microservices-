import { InstructorRequestStatus } from "./instructorRequest.enums";

export interface RegisterInstructorRequestDTO {
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
}

export interface LoginInstructorDTO {
  email: string;
  password: string;
}

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
    twitter?: string;
    instagaram?: string;
    github?: string;
    portfolio?: string;
    other?: string;
  };
  sampleContent?: Array<{
    type: "video" | "article" | "project" | "image";  
    title: string;
    url?: string;  
    description?: string;  
  }>;
  documents?: Array<{
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
  status:
    | InstructorRequestStatus.APPROVED
    | InstructorRequestStatus.CANCELLED
    | InstructorRequestStatus.PENDING
    | InstructorRequestStatus.REJECTED
    | InstructorRequestStatus.UNDER_REVIEW;
  approvalNotes?: string;
  rejectionReason?: string;
}

export interface GetInstructorRequestsOptions {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
