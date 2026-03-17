"use client";

import { useEffect, useState } from "react";
import { getAllCategoryAPI } from "../Api/services/category.service";
import {
  createCourseApi,
  updateCourseApi,
} from "../Api/services/course.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddCourseModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  course?: any;
}

export interface Category {
  _id: string;
  name: string;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  onClose,
  onSuccess,
  course,
}) => {
  const isEdit = !!course;

  const [categories, setCategories] = useState<Category[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    level: "",
    language: "",
    tags: "",
    prerequisites: "",
    learningOutcomes: "",
    status: "under_review",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title ?? "",
        description: course.description ?? "",
        price: course.price?.toString() ?? "",
        discount: course.discountPercentage?.toString() ?? "",
        category: course.categoryId?._id ?? course.categoryId ?? "",
        level: course.level ?? "",
        language: course.language ?? "",
        tags: course.tags?.join(", ") ?? "",
        prerequisites: course.prerequisites?.join(", ") ?? "",
        learningOutcomes: course.learningOutcomes?.join("\n") ?? "",
        status: course.status ?? "under_review",
      });
      if (course.thumbnail?.url) {
        setThumbnailPreview(course.thumbnail.url);
      }
    }
  }, [course]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategoryAPI();
      if (res.data) setCategories(res.data);
    } catch (error) {
      console.log("Category fetch error", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discountPercentage", formData.discount);
      data.append("categoryId", formData.category);
      data.append("level", formData.level);
      data.append("language", formData.language);
      data.append("tags", formData.tags);
      data.append("prerequisites", formData.prerequisites);
      data.append("learningOutcomes", formData.learningOutcomes);
      data.append("status", formData.status);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      if (isEdit) {
        await updateCourseApi(course._id, data);
      } else {
        await createCourseApi(data);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Create course error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm z-50 p-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 md:p-8 relative my-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Course" : "Create New Course"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEdit
              ? "Update course information below"
              : "Fill course information below"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label>Course Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Complete Frontend Development"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Discount %</Label>
            <Input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Level</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => handleSelectChange("level", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="all_levels">All Levels</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Language</Label>
            <Select
              value={formData.language}
              onValueChange={(value) => handleSelectChange("language", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tags</Label>
            <Input name="tags" value={formData.tags} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <Label>Prerequisites</Label>
            <Input
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Learning Outcomes</Label>
            <Textarea
              name="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="md:col-span-2 mt-5">
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                setThumbnail(file);
                setThumbnailPreview(URL.createObjectURL(file));
              }
            }}
          />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="mt-3 h-36 w-full object-cover rounded-lg border border-zinc-200"
            />
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8 border-t pt-5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Course"
                : "Create Course"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
