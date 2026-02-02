import React from "react";
import Image from "next/image";
import { Star, BookOpen, Clock, Users, ShoppingCart } from "lucide-react";
import { CourseI } from "./Course";

interface Props {
  item: CourseI;
}

const CourseCard = ({ item }: Props) => {
  return (
    <>
      <div className="bg-white mb-36 rounded-sm overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-xl">
        <div className="px-4 pt-4">
          <div className="relative h-64 w-full overflow-hidden rounded-sm group">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <span className="absolute top-1 left-1 bg-[#0AB99D] text-white px-6 py-2 rounded-sm  text-xs font-semibold shadow">
              Development
            </span>
          </div>
        </div>

        <div className="p-7">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-emerald-400 text-emerald-400"
              />
            ))}
            <Star size={18} className="text-gray-300" />
            <span className="ml-2 text-sm font-medium text-gray-500">
              ({item.rating})
            </span>
          </div>

          <h3 className="text-xl  w-fit font-extrabold text-slate-900 leading-snug mb-5 hover:text-[#0AB99D] transition-colors cursor-pointer">
            {item.title}
          </h3>

          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <BookOpen size={14} />
              <span className="text-[14px]">{item.lecture}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span className="text-[14px]">{item.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span className="text-[14px]">{item.student}+ Students</span>
            </div>
          </div>

          <div className="mt-4 mb-4 border-black  border-dashed border-b-2"></div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full overflow-hidden border">
              <Image
                src={item.teacherImage}
                alt={item.teacher}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              By{" "}
              <span className="font-bold text-slate-800 hover:text-[#0AB99D] cursor-pointer">
                {item.teacher}
              </span>{" "}
              in{" "}
              <span className="font-semibold text-slate-800">Development</span>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-900">
                ${item.price}
              </span>
              <del className="text-gray-400 text-lg">$120</del>
            </div>

            <div className="flex items-center gap-2 cursor-pointer group hover:text-gray-600">
              <ShoppingCart
                size={20}
                className="text-black transition-colors group-hover:text-gray-600"
              />
              <button className="text-black font-semibold transition-colors cursor-pointer group-hover:text-gray-600">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CourseCard;
