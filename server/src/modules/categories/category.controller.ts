import { Request, Response, NextFunction } from "express";
import * as categoryService from "./category.service";
import asyncHandler from "../../utils/AsyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { uploadToCloudinary } from "../../config/cloudinary.config";
import { ApiError } from "../../utils/ApiError";
import { GetCategoriesQueryDTO, UpdateCategoryDTO } from "./category.dto";
import { CATEGORY_MESSAGES } from "./category.constants";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const createdBy = (req as any).user?.userId;
    const userRole = (req as any).user?.role;

    if (!createdBy)
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");

    let imageData: { public_url: string } | undefined;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "categories");
      imageData = { public_url: result.secure_url };
    }

    const result = await categoryService.createCategoryServices(
      { ...req.body, image: imageData },
      createdBy,
      userRole,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(HTTP_STATUS.CREATED, result, CATEGORY_MESSAGES.CREATED),
      );
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const userRole = (req as any).user?.role;
    const data: UpdateCategoryDTO = req.body;

    const updatedCategory = await categoryService.updateCategoryServices(
      categoryId,
      data,
      userRole,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          updatedCategory,
          CATEGORY_MESSAGES.UPDATED,
        ),
      );
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const userRole = (req as any).user?.role;

    const categoryId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const response = await categoryService.deleteCategoryServices(
      categoryId,
      userId,
      userRole,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, response, CATEGORY_MESSAGES.DELETED),
      );
  },
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const query: GetCategoriesQueryDTO = req.query as any;

    const categories = await categoryService.getAllCategoriesServices(query);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, categories, CATEGORY_MESSAGES.FETCHED),
      );
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const response = await categoryService.getCategoryByIdServices(categoryId);
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          response,
          CATEGORY_MESSAGES.GETCATEGORYBYID,
        ),
      );
  },
);

export const getCategoryBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug)
      ? req.params.slug[0]
      : req.params.slug;
    const category = await categoryService.getCategoryBySlugServices(slug);
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          category,
          CATEGORY_MESSAGES.GETCATEGORYBYSLUG,
        ),
      );
  },
);
