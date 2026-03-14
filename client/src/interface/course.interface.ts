export interface Thumbnail {
  url: string;
  publicId: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: Thumbnail;
  price: number;
  discountedPrice: number;
  discountPercentage: number; 
  level: string;
  language: string;
  status: string;
  rating: number;
  totalEnrollments: number;
  totalLectures: number;
  totalReviews: number;
  isBestseller: boolean;
  isFeatured: boolean;
  coursePublish: boolean;
  tags: string[]; 
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseCardProps {
  course: Course;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}