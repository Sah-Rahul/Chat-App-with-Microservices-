"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import testImg1 from "../../public/images/test2.jpg";
import team2 from "../../public/images/team2.png";
import team3 from "../../public/images/team3.png";
import wave from "../../public/images/wave3.png";
import spin from "../../public/images/spin.png";

const Testimonial = () => {

  const [current, setCurrent] = useState(0);

  const stats = [
    {
      icon: "/testimonial/training.png",
      num: "3k+",
      label: "Successfully Trained",
    },
    {
      icon: "/testimonial/completed-task.png",
      num: "15k+",
      label: "Classes Completed",
    },
    {
      icon: "/testimonial/customer-review.png",
      num: "97%",
      label: "Satisfaction Rate",
    },
    {
      icon: "/testimonial/teacher.png",
      num: "102k+",
      label: "Students Community",
    },
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Web Developer",
      text: "This platform transformed my career! Learned React and Next.js and landed a job.",
      userImg: team2, 
    },
    {
      name: "Michael Chen",
      role: "UI/UX Designer",
      text: "Outstanding experience! The flexible classes fit perfectly with my schedule.",
      userImg: team3, 
    },
    
  ];

  const move = (dir: number) =>
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length);

  return (
    <div
      className="min-h-screen overflow-hidden bg-cover bg-center relative px-6 py-16 flex flex-col justify-center"
      style={{ backgroundImage: `url(${testImg1.src})` }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        <div className="grid grid-cols-1 -mt-27 md:grid-cols-4 gap-6 bg-[#0BB69B] p-8  ">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-4 text-white">
              <div className="bg-white p-3  w-14 h-14 flex items-center justify-center shrink-0">
                <img
                  src={s.icon}
                  alt="icon"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{s.num}</h3>
                <p className="text-md opacity-90">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="bg-[#CDF0EA]  text-[#0AB99D] px-6 py-2 rounded-md font-bold text-sm uppercase tracking-wider">
              Testimonial
            </span>
            <h2 className="text-4xl mt-5 md:text-5xl font-bold text-[#0E2A46] leading-[1.2]">
              Creating A Community Of <br /> Life Long {" "}
               <span className="relative inline-block">
              Learners.
              <svg
                className="absolute top-10 left-0 w-full h-6"
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
              
            </h2>
            <div className="flex gap-3 ml-20">
              <button
                onClick={() => move(-1)}
                className="p-3 border border-white/30 rounded-full bg-[#0AB99D] text-white hover:bg-[#0AB99D] hover:border-[#0AB99D] transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => move(1)}
                className="p-3 border border-white/30 rounded-full bg-[#0AB99D]  text-white hover:bg-[#0AB99D] hover:border-[#0AB99D] transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="bg-white p-10   shadow-xl relative overflow-hidden">
            <div className="flex text-[#0AB99D] mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" size={18} />
              ))}
            </div>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic mb-10">
              "{reviews[current].text}"
            </p>

            <div className="flex items-center gap-5 border-t pt-8">
              <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-[#0AB99D] shrink-0">
                <Image
                  src={reviews[current].userImg}
                  alt={reviews[current].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xl">
                  {reviews[current].name}
                </h4>
                <p className="text-[#0AB99D] font-medium">
                  {reviews[current].role}
                </p>
              </div>
            </div>
           
          </div>
           <div className="absolute top-5 right-2">
              <Image src={spin} alt="spin" className="rotate-spin" />
            </div>
        </div>
      </div>

      <div className="absolute -bottom-24 left-0">
        <Image src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default Testimonial;
