import React from "react";
import Image from "next/image";
import dottedImg from "../../public/images/dotted.png";
import growImg from "../../public/images/Grow3.png";
import growImg2 from "../../public/images/Grow2.jpg";
import growImg4 from "../../public/images/grow4.jpg";
import reactImg from "../../public/images/reactangle.png";
import spin from "../../public/images/spin.png";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  
  return (
    <div className="h-200  flex bg-gray-500">
      <div className="bg-white   overflow-hidden relative h-full w-150">
        <div className="pt-16 px-5">
          <Image src={dottedImg} alt="dottedImg" className=" animate-float" />
        </div>
        <div className="h-147.5 overflow-hidden bg-red-500 w-75 absolute top-42 right-0 rounded-sm">
          <Image src={growImg} alt="growImg" />
        </div>
        <div className="h-86 w-62 top-32 left-32 rounded overflow-hidden bg-red-500 absolute">
          <Image
            src={growImg2}
            alt="growImg"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="h-72 w-62 bg-red-500 absolute 
        bottom-5 left-32 rounded"
        >
          <Image
            src={growImg4}
            alt="growImg"
            className="w-full h-full object-cover rounded"
          />
        </div>

        <div
          className="  absolute 
        bottom-5 right-6 rounded"
        >
          <Image
            src={reactImg}
            alt="growImg"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>

      <div className="h-full relative flex items-center bg-white  px-8">
        <div className="max-w-2xl relative">
          <span className="inline-block mb-4 rounded-md bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-600">
            OUR ABOUT US
          </span>

          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Learn & Grow Your{" "}
            <span className="relative inline-block">
              Skills
              <svg
                className="absolute top-7 left-0 w-full h-6"
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
            <br />
            Anytime, Anywhere
          </h2>

          <p className="mt-6 text-slate-600 leading-relaxed">
            Our learning management system helps you master new skills through
            interactive courses, expert-led lessons, and flexible learning
            paths. Learn at your own pace, track your progress, and achieve your
            goals from anywhere in the world.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">
                FLEXIBLE LEARNING
              </h4>
              <p className="text-slate-600 text-sm">
                Access courses anytime and learn at your own pace with lifetime
                access to high-quality educational content.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">
                EXPERT INSTRUCTORS
              </h4>
              <p className="text-slate-600 text-sm">
                Learn from industry professionals and certified instructors who
                guide you with practical knowledge and real-world experience.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Button className="bg-[#0AB99D] hover:bg-[#06705e]  cursor-pointer w-56 text-md px-14 sm:px-14 py-3 sm:py-7 text-white flex items-center gap-2 group">
              Load More Course
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </Button>
          </div>
        </div>
        <div className="absolute top-5 right-5">
          <Image src={spin} alt="spin" className="rotate-spin" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
