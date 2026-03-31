import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import { UserRole } from "../users/user.enums";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
  GetCategoriesQueryDTO,
} from "./category.dto";
import { CategoryStatus } from "./category.enums";
import CategoryModel from "./category.model";
import { CATEGORY_MESSAGES } from "./category.constants";

export const createCategoryServices = async (
  data: CreateCategoryDTO,
  userId: string,
  userRole: string,
) => {
  if (!userId)
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      CATEGORY_MESSAGES.UNAUTHORIZED,
    );
  if (userRole !== UserRole.INSTITUTE_ADMIN)
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      CATEGORY_MESSAGES.ONLY_ADMIN_CREATE,
    );

  if (!data.name || !data.name.trim())
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Category name is required");

  const name = data.name.trim();
  const alreadyExistName = await CategoryModel.findOne({ name });
  if (alreadyExistName)
    throw new ApiError(HTTP_STATUS.CONFLICT, CATEGORY_MESSAGES.ALREADY_EXISTS);

  const imageObj = data.image
    ? typeof data.image === "string"
      ? { public_url: data.image }
      : data.image
    : undefined;

  const category = await CategoryModel.create({
    name,
    createdBy: userId,
    image: imageObj,
  });

  return category;
};

export const getAllCategoriesServices = async (
  query: GetCategoriesQueryDTO,
) => {
  const filter: any = {};

  if (query.name) filter.name = { $regex: query.name, $options: "i" };
  if (query.image) filter["image.public_url"] = query.image;
  if (query.status) filter.status = query.status;

  const categories = await CategoryModel.find(filter).lean();
  return categories;
};

export const getCategoryByIdServices = async (id: string) => {
  if (!id)
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Category ID is required");

  const category = await CategoryModel.findById(id).lean();
  if (!category)
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);

  return category;
};

export const getCategoryBySlugServices = async (slug: string) => {
  if (!slug || !slug.trim())
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Slug is required");

  const category = await CategoryModel.findOne({ slug: slug.trim() });
  if (!category)
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);

  return category;
};

export const updateCategoryServices = async (
  categoryId: string,
  data: UpdateCategoryDTO,
  userRole: string,
) => {
  if (!categoryId)
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Category ID is required");

  if (userRole !== UserRole.INSTITUTE_ADMIN)
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      CATEGORY_MESSAGES.ONLY_ADMIN_UPDATE,
    );

  const category = await CategoryModel.findById(categoryId);
  if (!category)
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);

  if (data.name) category.name = data.name.trim();
  if (data.image)
    category.image =
      typeof data.image === "string" ? { public_url: data.image } : data.image;
  if (data.status) category.status = data.status as CategoryStatus;

  await category.save();
  return category;
};

export const deleteCategoryServices = async (
  categoryId: string,
  userId: string,
  userRole: string,
) => {
  if (!categoryId)
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Category ID required");
  if (!userId)
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      CATEGORY_MESSAGES.UNAUTHORIZED,
    );

  const category = await CategoryModel.findById(categoryId);
  if (!category)
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);

  if (
    category.createdBy.toString() !== userId &&
    userRole !== UserRole.INSTITUTE_ADMIN
  )
    throw new ApiError(HTTP_STATUS.FORBIDDEN, CATEGORY_MESSAGES.FORBIDDEN);

  const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
  if (!deletedCategory)
    throw new ApiError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);

  return deletedCategory;
};
