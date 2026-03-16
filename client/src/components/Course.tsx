"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import CourseCard from "./CourseCard";
import { ArrowRight } from "lucide-react";

 
import shapeImg from "../../public/course/shape-2.webp";
import courseLine from "../../public/images/courseLine.png";
import spin from "../../public/images/spin.png";

 
import { getAllCourseApi } from "../Api/services/course.service";
import { Course as CourseInterface } from "../interface/course.interface";
import SkeletonLoading from "./skeletonLoading";

const Course = () => {
  const [courses, setcourses] = useState<CourseInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const allCourses = async () => {
    try {
      const response = await getAllCourseApi(3); 
      setcourses((response.data || []).slice(0, 3));
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2] relative">
      <div className="h-82 flex items-center justify-between">
        <div className="h-full w-1/5 flex items-center">
          <Image
            src={shapeImg}
            alt="shape image"
            width={140}
            height={140}
            className="ml-12 animate-float"
          />
        </div>
        <div className="h-full flex flex-col items-center justify-center w-[60%]">
          <Button className="mb-4 mt-10 bg-[#C4E7E1] hover:bg-[#C4E7E1] px-9 text-[#0AB99D] rounded-sm">
            Top Popular Course
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0E2A46] font-bold capitalize">
            Study Course{" "}
            <span className="relative inline-block">
              student
              <svg
                className="absolute top-8.5 left-0 w-full h-6"
                viewBox="0 0 180 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 14 Q45 6, 90 10 T175 14"
                  stroke="#0AB99D"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            can
          </h1>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0E2A46] font-bold capitalize">
            join with Us.
          </span>
        </div>
        <div className="h-full w-[28%]">
          <Image src={courseLine} alt="courseLine" />
          <div className="absolute top-3 right-4">
            <Image src={spin} alt="spin" className="rotate-spin" />
          </div>
        </div>
      </div>

      {loading ? (
       <SkeletonLoading count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10">
          {courses.map((course) => (
            <CourseCard key={course._id} item={course} />
          ))}
        </div>
      )}

      <div className="flex justify-center pb-20">
        <Button className="bg-[#0AB99D] hover:bg-[#06705e] cursor-pointer w-56 text-md px-14 py-7 text-white flex items-center gap-2 group">
          Load More Course
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
        </Button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes spin360 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .rotate-spin { animation: spin360 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default Course;