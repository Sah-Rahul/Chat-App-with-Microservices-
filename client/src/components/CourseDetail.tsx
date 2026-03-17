"use client";

import { useEffect, useState } from "react";
import { getCourseBySlugApi } from "../Api/services/course.service";
import Layout from "./Layout";
import { Star, Users, BookOpen, Globe } from "lucide-react";
import ReviewSection from "./ReviewSection";
import Loading from "./Loading";

interface Props {
  slug: string;
}

const CourseDetail = ({ slug }: Props) => {
  const [course, setCourse] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      const data = await getCourseBySlugApi(slug);
      setCourse(data.data);
    };

    fetchCourse();
  }, [slug]);

  if (!course) return <Loading />;

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 h-full">
          <div className="flex-1">
            <img
              src={course.thumbnail?.url}
              alt={course.title}
              className="w-full rounded-xl object-cover max-h-96"
            />

            <div className="flex items-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(course.rating)
                      ? "text-teal-500 fill-teal-500"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({course.rating || 0})
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {course.title}
            </h2>

            <div className="flex gap-2 mt-6 border-b">
              {["overview", "curriculum", "instructor", "reviews"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize rounded-t-md ${
                      activeTab === tab
                        ? "bg-teal-400 text-white"
                        : "text-gray-600 hover:text-teal-400"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            <div className="mt-6">
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Course Description
                  </h3>
                  <p className="text-gray-600">{course.description}</p>

                  {course.prerequisites?.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Prerequisites
                      </h3>
                      <ul className="space-y-2">
                        {(Array.isArray(course.prerequisites)
                          ? course.prerequisites.flatMap((item: string) =>
                              item.split(/\r\n|\n|(?<=\.)\s+/),
                            )
                          : course.prerequisites.split(/\r\n|\n|(?<=\.)\s+/)
                        )
                          .filter((item: string) => item.trim() !== "")
                          .map((item: string, i: number) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-gray-600"
                            >
                              <span className="text-teal-400 mt-0.5 shrink-0 font-bold">
                                •
                              </span>
                              <span>{item.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {course.learningOutcomes?.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        What Will I Learn?
                      </h3>
                      <ul className="space-y-2">
                        {course.learningOutcomes
                          .flatMap((item: string) => item.split(/\r\n|\n|,/))
                          .filter((item: string) => item.trim() !== "")
                          .map((item: string, i: number) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-gray-600"
                            >
                              <span className="text-teal-500 mt-0.5 shrink-0 font-bold">
                                ✓
                              </span>
                              <span>{item.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "curriculum" && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Curriculum</h3>

                  {course.curriculum?.length > 0 ? (
                    <ul className="space-y-2">
                      {course.curriculum.map((item: any, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                        >
                          <BookOpen size={16} className="text-teal-500" />
                          {item.title || item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No curriculum added yet.</p>
                  )}
                </div>
              )}

              {activeTab === "instructor" && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Instructor</h3>

                  {course.instructorId && (
                    <div className="flex gap-4">
                      <img
                        src={
                          course.instructorId.avatar?.url ||
                          "/default-avatar.png"
                        }
                        className="w-16 h-16 rounded-full"
                      />

                      <div>
                        <p className="font-bold">
                          {course.instructorId.firstName}{" "}
                          {course.instructorId.lastName}
                        </p>

                        <p className="text-gray-500 text-sm">
                          {course.instructorId.bio}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "reviews" && (
                <ReviewSection
                  courseSlug={course.slug}
                  currentUserName="User"
                />
              )}
            </div>
          </div>

          <div className="lg:w-72 w-full">
            <button // bhai es button ko role k hisab se show krna hai ok instructor hoto show and role instructor na hotot show na ho ok
              onClick={() => alert("Add Lectures clicked!")}
              className="w-full cursor-pointer bg-teal-500 mb-3 text-white py-3 rounded-lg"
            >
              Add Lectures →
            </button>

            <div className="border rounded-xl overflow-hidden shadow-md sticky top-6">
              <img
                src={course.thumbnail?.url}
                alt={course.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold">
                    ${course.discountedPrice || course.price}
                  </span>

                  {course.discountedPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${course.price}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  30-Day Money-Back Guarantee
                </p>

                <button className="w-full cursor-pointer bg-teal-500 text-white py-3 rounded-lg">
                  Buy Course →
                </button>

                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Users size={14} /> Enrolled
                    </span>
                    <span>{course.totalEnrollments || 25}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} /> Lectures
                    </span>
                    <span>{course.totalLectures || 20}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Star size={14} /> Skill Level
                    </span>
                    <span>{course.level || "Beginner"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Globe size={14} /> Language
                    </span>
                    <span>{course.language || "English"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
