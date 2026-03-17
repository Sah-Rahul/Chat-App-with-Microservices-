"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { getAllCourseApi } from "../Api/services/course.service";
import SkeletonLoading from "../components/skeletonLoading";
import CourseCard from "./Coursecard";

const Course = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const allCourse = async () => {
    try {
      setLoading(true);
      const res = await getAllCourseApi();
      setCourses(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCourse();
  }, []);

  const totalCourses = courses.length;
  const publishedCourses = courses.filter(
    (c) => c.status === "published",
  ).length;
  const draftCourses = courses.filter((c) => c.status === "draft").length;

  return (
    <AdminLayout>
      <div className="min-h-screen p-5 sm:p-8 bg-[#f2f2f2] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Course <span className="text-[#09b89b]">Management</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {loading ? "Loading..." : `${totalCourses} courses found`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 flex-1 sm:flex-none sm:min-w-55">
              <svg
                className="w-4 h-4 text-zinc-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                className="text-sm text-zinc-700 bg-transparent outline-none placeholder:text-zinc-300 w-full"
                placeholder="Search title or tag..."
              />
            </div>

            <select className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-600 outline-none cursor-pointer">
              <option value="all">All Status</option>
              <option value="under_review">Under Review</option>
              <option value="published">Published</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="unpublished">Unpublished</option>
            </select>

            <select className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-600 outline-none cursor-pointer">
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all_levels">All Levels</option>
            </select>

            <button
              onClick={allCourse}
              disabled={loading}
              className="bg-white border border-zinc-200 hover:border-orange-300 disabled:opacity-50 transition-colors text-zinc-600 text-sm font-semibold rounded-xl px-3 py-2"
            >
              <svg
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 1 0 4.582 9"
                />
              </svg>
            </button>

            
          </div>
        </div>

        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "TOTAL", value: totalCourses, accent: true },
            { label: "PUBLISHED", value: publishedCourses, accent: false },
            { label: "DRAFT", value: draftCourses, accent: false },
          ].map(({ label, value, accent }) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-300 bg-white p-5 flex flex-col items-center"
            >
              <span className="text-xs font-semibold tracking-widest text-zinc-400">
                {label}
              </span>
              <span
                className={`mt-2 text-3xl font-extrabold ${accent ? "text-[#09b89b]" : "text-zinc-900"}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

       
        {loading ? (
          <SkeletonLoading count={6} />
        ) : (
          <div className="grid sm:grid-cols-2 mt-5 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} item={course} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Course;
