import { CategoryStatus } from "./category.enums";

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  image?: string;
  status?: string;
}

export interface GetCategoriesQueryDTO { 
  name?: string;  
  image?: string; 
  status?: CategoryStatus;  
}

 