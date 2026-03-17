"use client";

import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Course as CourseInterface } from "../interface/course.interface";
import { getAllCourseApi } from "../Api/services/course.service";
import CourseCard from "./CourseCard";
import Loading from "./Loading";
import { getAllCategoryAPI } from "../Api/services/category.service";
import { Category } from "../admin/AddCourseModal";
import { Search, SlidersHorizontal, X } from "lucide-react";

const Allcourses = () => {
  const [courses, setcourses] = useState<CourseInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const allCourses = async () => {
    try {
      const response = await getAllCourseApi();
      setcourses(response.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
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
    allCourses();
    fetchCategories();
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedLevel("");
    setSelectedLanguage("");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || selectedLevel || selectedLanguage;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        
        {/* Header Banner */}
        <div className="bg-gray-900 py-10 px-10">
          <h1 className="text-3xl font-bold text-white mb-2">All Courses</h1>
          <p className="text-gray-400 text-sm">
            {courses.length} courses available
          </p>
        </div>

        <div className="px-10 py-8">
          
          {/* Search + Filter Toggle Row */}
          <div className="flex items-center gap-3 mb-6">
            
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                showFilters
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-teal-400"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              )}
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-3 text-sm text-red-500 hover:text-red-600 font-medium"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all_levels">All Levels</option>
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="">All Languages</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="nepali">Nepali</option>
                </select>
              </div>

            </div>
          )}

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {searchQuery && (
                <span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs px-3 py-1.5 rounded-full border border-teal-200">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs px-3 py-1.5 rounded-full border border-teal-200">
                  Category: {categories.find((c) => c._id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedLevel && (
                <span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs px-3 py-1.5 rounded-full border border-teal-200">
                  Level: {selectedLevel}
                  <button onClick={() => setSelectedLevel("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedLanguage && (
                <span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs px-3 py-1.5 rounded-full border border-teal-200">
                  Language: {selectedLanguage}
                  <button onClick={() => setSelectedLanguage("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Courses Grid */}
          {loading ? (
            <Loading />
          ) : (
            <>
              {courses.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No courses found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard key={course._id} item={course} />
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default Allcourses;