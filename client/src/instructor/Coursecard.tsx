"use client";

import React from "react";
import { Edit2Icon, Trash2Icon, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  courseTableColumns,
  levelConfig,
  statusConfig,
} from "../utils/statusConfig";

interface CoursecardProps {
  courses: any[];
  onEdit: (course: any) => void;
  onDelete: (id: string) => void;
}

const Coursecard: React.FC<CoursecardProps> = ({
  courses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-6 bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              {courseTableColumns.map((col, index) => (
                <th
                  key={index}
                  className={`px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider ${
                    col.align === "center" ? "text-center" : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {courses.map((course, idx) => {
              const status = statusConfig[course.status] ?? statusConfig.draft;
              const levelClass =
                levelConfig[course.level] ?? levelConfig.beginner;
              const instructor = course.instructorId;

              return (
                <tr
                  key={course._id}
                  className={`hover:bg-zinc-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-zinc-50/40"}`}
                >
                  <td className="px-5 py-4 text-zinc-400 font-medium">
                    {idx + 1}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0 bg-zinc-100">
                        {course.thumbnail?.url ? (
                          <Image
                            src={course.thumbnail.url}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-300 text-[10px]">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold   hover:text-[#0AB99D] transition-colors cursor-pointer">
                          <Link href={`/admin/courses/${course.slug}`}>
                            {course.title.slice(0, 15)}...
                          </Link>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center shrink-0 overflow-hidden">
                        {instructor?.avatar ? (
                          <img
                            src={instructor.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-teal-600 uppercase">
                            {instructor?.firstName?.charAt(0) ?? "I"}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-slate-700 font-medium whitespace-nowrap">
                        {instructor?.firstName
                          ? `${instructor.firstName} ${instructor.lastName ?? ""}`.trim()
                          : "Instructor"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center font-semibold text-slate-700">
                    {course.totalLectures ?? 0}
                  </td>

                  <td className="px-5 py-4 text-center text-slate-600">
                    {course.duration ? `${course.duration}h` : "—"}
                  </td>

                  <td className="px-5 py-4 text-center font-semibold text-slate-700">
                    {course.totalEnrollments ?? 0}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className="font-bold text-slate-800 block">
                      Rs{course.discountedPrice}
                    </span>
                    {course.discountPercentage > 0 && (
                      <del className="text-xs text-zinc-400">
                        ₹{course.price}
                      </del>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${levelClass}`}
                    >
                      {course.level?.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(course)}
                        className="p-1.5 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors"
                        title="Edit"
                      >
                        <Edit2Icon size={15} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(course._id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2Icon size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400 gap-2">
            <svg
              className="w-10 h-10 text-zinc-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-sm">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coursecard;
