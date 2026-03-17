import React from "react";
import Image from "next/image";
import { BookOpen, Clock, Users, ShoppingCart } from "lucide-react";
import { Course } from "../interface/course.interface";
import { renderStars } from "../utils/renderStar";
import Link from "next/link";

interface Props {
  item: Course;
}

const CourseCard = ({ item }: Props) => {
  return (
    <div className="bg-white mb-10 rounded-sm overflow-hidden border border-gray-100  h-full flex flex-col">
      <div className="px-4 pt-4">
        <div className="relative h-64 w-full overflow-hidden   group">
          <Link href={`/courses=${item.slug}`}>
            <Image
              src={item.thumbnail?.url || "/placeholder-course.jpg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
          <span className="absolute top-2 left-2 bg-[#0AB99D] text-white px-4 py-1 rounded-sm text-xs font-semibold shadow capitalize">
            {item.tags && item.tags.length > 0 ? item.tags[0] : "Development"}
          </span>
        </div>
      </div>

      <div className="p-7 flex flex-col grow">
        <div className="flex items-center gap-1 mb-4">
          {renderStars(item.rating)}
          <span className="ml-2 text-sm font-medium text-gray-500">
            ({item.totalReviews})
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-5 hover:text-[#0AB99D] transition-colors cursor-pointer min-h-14">
          <Link href={`/courses/${item.slug}`}>{item.title}</Link>
        </h3>

        <div className="flex items-center justify-between text-gray-600 mb-5">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-[#0AB99D]" />
            <span className="text-[13px]">{item.totalLectures} Lectures</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#0AB99D]" />
            <span className="text-[13px]">{item.duration}h</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-[#0AB99D]" />
            <span className="text-[13px]">
              {item.totalEnrollments}+ Students
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="mb-4 border-gray-700 border-dashed border-b-2"></div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#0AB99D]">
                {item.level.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              By{" "}
              <span className="font-bold text-slate-800 hover:text-[#0AB99D] cursor-pointer">
                Instructor
              </span>{" "}
              in{" "}
              <span className="font-semibold text-slate-800 capitalize">
                {item.level}
              </span>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-900">
                Rs{item.discountedPrice}
              </span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer group hover:text-[#0AB99D]">
              {item.price > item.discountedPrice && (
                <del className="text-gray-400 text-lg">Rs{item.price}</del>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
