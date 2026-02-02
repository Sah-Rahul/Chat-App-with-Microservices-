"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import Image, { StaticImageData } from "next/image";
import CourseCard from "./CourseCard";
import { ArrowRight } from "lucide-react";

// Images
import shapeImg from "../../public/course/shape-2.webp";
import DataScience from "../../public/course/course1.jpg";
import AdobeIllustrator from "../../public/course/course2.jpg";
import BusinessAnalysis from "../../public/course/course3.jpg";
import Teacher from "../../public/images/team1.png";
import courseLine from "../../public/images/courseLine.png";
import spin from "../../public/images/spin.png";

export interface CourseI {
  image: StaticImageData;
  rating: number;
  title: string;
  lecture: string;
  duration: string;
  student: number;
  teacher: string;
  teacherImage: StaticImageData;
  price: number;
}

const Course = () => {
  
  const courses: CourseI[] = [
    {
      image: DataScience,
      rating: 4.5,
      title: "React for Beginners",
      lecture: "12 Lectures",
      duration: "6 hours",
      student: 1200,
      teacher: "John Doe",
      teacherImage: Teacher,
      price: 49,
    },
    {
      image: AdobeIllustrator,
      rating: 4.7,
      title: "Advanced JavaScript",
      lecture: "20 Lectures",
      duration: "10 hours",
      student: 950,
      teacher: "Jane Smith",
      teacherImage: Teacher,
      price: 59,
    },
    {
      image: BusinessAnalysis,
      rating: 4.9,
      title: "Fullstack Development",
      lecture: "30 Lectures",
      duration: "15 hours",
      student: 1800,
      teacher: "Alice Johnson",
      teacherImage: Teacher,
      price: 99,
    },
  ];

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
          <h1 className="text-2xl  sm:text-3xl md:text-4xl lg:text-5xl text-[#0E2A46] font-bold capitalize">
            Study Course
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
            </span>
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

      <div className="grid grid-cols-1    md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10">
        {courses.map((item, index) => (
          <CourseCard key={index} item={item} />
        ))}
      </div>

      <div className=" flex items-center absolute top-250 left-137.5">
        <Button className="bg-[#0AB99D] hover:bg-[#06705e]  cursor-pointer w-56 text-md px-14 sm:px-14 py-3 sm:py-7 text-white flex items-center gap-2 group">
          Load More Course
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
        </Button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 4s ease-in-out infinite;
        }

        @keyframes spin360 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
  }
        .rotate-spin {
        animation: spin360 4s linear infinite;
        }

      `}</style>
    </div>
  );
};

export default Course;
