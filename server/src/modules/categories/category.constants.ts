export const CATEGORY_CONSTANTS = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_NESTING_LEVEL: 3,
  DEFAULT_ICON: "default-category-icon.svg",
};

 
export const CATEGORY_MESSAGES = {
  CREATED: "Category created successfully",
  UPDATED: "Category updated successfully",
  DELETED: "Category deleted successfully",
  FETCHED: "Category fetched successfully",
  GETCATEGORYBYID: "Category fetched by ID",
  GETCATEGORYBYSLUG: "Category fetched by slug",
  NOT_FOUND: "Category not found",
  ALREADY_EXISTS: "Category with this name already exists",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "You cannot perform this action",
  ONLY_ADMIN_CREATE: "Only admin can create categories",
  ONLY_ADMIN_UPDATE: "Only admin can update categories",
};