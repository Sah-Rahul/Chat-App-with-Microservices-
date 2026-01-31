import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import student1 from "../public/images/career1.png";
import student2 from "../public/images/career2.png";
import courseLine from "../public/images/courseLine.png";
import wave from "../public/images/wave2.png";
import spin from "../public/images/spin.png";
import spin1 from "../public/images/spin1.png";
import moveImg from "../public/images/move.png";

const ChooseYourCareer = () => {
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <div className="h-96   relative">
        <div className="absolute top-0 right-0">
          <Image src={courseLine} alt="courseLine" />
        </div>
        <div className="absolute top-22 right-48">
          <Image src={spin} alt="spin" className="rotate-spin" />
        </div>
        <div className="absolute top-22 left-10 ">
          <Image src={moveImg} alt="move" className="  animate-float" />
        </div>
        <div className="absolute bottom-22 left-70  moving-img">
          <Image src={wave} alt="wave" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Button className="text-[#0BB69B] bg-[#CDF0EA] px-5 py-2 rounded font-bold uppercase tracking-wider text-xs mb-6">
            Choose your career
          </Button>
          <h1 className="text-5xl text-[#0E2A46] font-bold capitalize">
            Discover Your Career Path
          </h1>
        </div>
      </div>

      <div className="h-96 mt-6 flex gap-6 px-10">
        <Card className="relative w-1/2 overflow-hidden rounded bg-[#0AB99D]">
          <CardContent className="h-full p-8 flex flex-col justify-between">
            <div className="space-y-4 mt-16 z-10">
              <p className="text-sm text-white/90">Start From Today</p>

              <h3 className="text-2xl font-bold text-white leading-snug">
                Join Our Training Courses <br />& Build Your Skills
              </h3>

              <Button className="bg-black text-white hover:bg-black/90">
                Join Now →
              </Button>
            </div>

            <div className="absolute bottom-0 right-0">
              <Image src={student1} alt="student" priority />
            </div>
          </CardContent>
        </Card>

        <Card className="relative w-1/2 overflow-hidden rounded bg-[#0AB99D]">
          <CardContent className="h-full p-8 flex flex-col justify-between">
            <div className="space-y-4 mt-16 z-10">
              <p className="text-sm text-white/90">Explore Your Path</p>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Explore New Opportunities <br /> & Grow Fast
              </h3>

              <Button className="bg-black text-white hover:bg-black/90">
                Explore Now →
              </Button>
            </div>

            <div className="absolute bottom-0 right-0">
              <Image src={student2} alt="student" priority />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-16 relative">
        <div className="absolute top-3 left-50">
          <Image src={spin1} alt="spin" className="rotate-spin" />
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

export default ChooseYourCareer;
