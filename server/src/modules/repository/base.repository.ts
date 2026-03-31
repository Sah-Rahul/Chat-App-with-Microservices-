import { Model, UpdateQuery } from "mongoose";

// CREATE
export const createOne = async <T>(
  model: Model<T>,
  data: Partial<T>,
): Promise<T> => {
  return model.create(data);
};

// FIND ONE ✅ (NO FilterQuery)
export const findOne = async <T>(
  model: Model<T>,
  filter: Parameters<Model<T>["findOne"]>[0],
): Promise<T | null> => {
  return model.findOne(filter);
};

// FIND BY ID
export const findById = async <T>(
  model: Model<T>,
  id: string,
): Promise<T | null> => {
  return model.findById(id);
};

// UPDATE
export const updateById = async <T>(
  model: Model<T>,
  id: string,
  update: UpdateQuery<T>,
): Promise<T | null> => {
  return model.findByIdAndUpdate(id, update, { new: true });
};