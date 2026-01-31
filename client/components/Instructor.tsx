"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Share2,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

import team1 from "../public/images/team1.png";
import team2 from "../public/images/team2.png";
import team3 from "../public/images/team3.png";
import team1_alt from "../public/images/team1.png";
import moveImg from "../public/images/move.png";
import spin from "../public/images/spin.png";
import spin2 from "../public/images/spin1.png";

const Instructor = () => {
  const instructors = [
    { name: "Jesus Pendley", role: "Teacher", img: team1 },
    { name: "Sarah Johnson", role: "Developer", img: team2 },
    { name: "Michael Chen", role: "Designer", img: team3 },
    { name: "Angela Yu", role: "Instructor", img: team1_alt },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center bg-white overflow-hidden">
      <div className="w-full lg:max-w-125 relative flex flex-col justify-center px-8 lg:ml-12 py-12">
        <span className="text-[#0BB69B] bg-[#CDF0EA] px-5 py-2 rounded font-bold w-fit uppercase tracking-wider text-xs mb-6">
          Our Instructor
        </span>

        <div className="absolute top-0 right-0 hidden lg:block">
          <Image src={spin} alt="spin" className="rotate-spin" />
        </div>
        <div className="absolute -top-24 left-0 hidden lg:block moving-img">
          <Image src={moveImg} alt="move" />
        </div>
         <div className="absolute -bottom-16 right-0 hidden lg:block">
          <Image src={spin2} alt="spin" className="rotate-spin" />
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0E2A46] mb-6 leading-tight">
          Meet Our{" "}
          <span className="relative inline-block">
            Expert
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 8 Q 50 2 100 8"
                stroke="#0BB69B"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </span>{" "}
          <br /> Instructor
        </h2>

        <p className="text-gray-500 text-base mb-10 max-w-sm">
          Our expert instructors bring real-world industry experience and teach
          according to the latest trends to help you build practical, job-ready
          skills.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-[#0AB99D] cursor-pointer hover:bg-[#06705e] w-36 h-14 px-8 text-white flex items-center gap-2 group transition-all">
            Contact Us{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
          </Button>
          <Button className="bg-black cursor-pointer hover:bg-gray-800 h-14 px-8 text-white flex items-center gap-2 group transition-all">
            Become Instructor{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <div className="w-full lg:flex-1 min-h-screen   relative     flex items-center justify-center p-8 lg:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-4xl">
          {instructors.map((ins, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 border-4 border-[#0BB69B] rounded-2xl translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>

              <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-xl aspect-4/5">
                <Image
                  src={ins.img}
                  alt={ins.name}
                  fill
                  className="object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-500"
                />

                <div className="absolute top-4 right-4 flex flex-col gap-2 items-center group/social">
                  <div className="w-10 h-10 bg-[#0BB69B] rounded-full flex items-center justify-center text-white cursor-pointer z-20 shadow-lg">
                    <Share2 size={18} />
                  </div>

                  <div className="flex flex-col gap-2 opacity-0 translate-y-2.5 group-hover/social:opacity-100 group-hover/social:translate-y-0 transition-all duration-300">
                    <div className="w-9 h-9 bg-white text-[#1877F2] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer delay-75">
                      <Facebook size={16} fill="currentColor" />
                    </div>
                    <div className="w-9 h-9 bg-white text-[#0077B5] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer delay-150">
                      <Linkedin size={16} fill="currentColor" />
                    </div>
                    <div className="w-9 h-9 bg-white text-[#E4405F] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer delay-200">
                      <Instagram size={16} />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white p-3 rounded-xl flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <div>
                    <h4 className="font-bold text-[#0E2A46] text-sm sm:text-base leading-none">
                      {ins.name}
                    </h4>
                    <p className="text-[#0BB69B] text-xs font-semibold mt-1">
                      {ins.role}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-[#CDF0EA] text-[#0AB99D] rounded-full flex items-center justify-center">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .moving-img {
          animation: moveLeftRight 4s ease-in-out infinite;
        }

        @keyframes moveLeftRight {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(60px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Instructor;
