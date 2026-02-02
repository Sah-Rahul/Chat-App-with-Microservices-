import React from "react";
import Image from "next/image";
import dottedImg from "../../public/images/dotted.png";
import react from "../../public/images/react.png";
import react2 from "../../public/images/react2.png";
import Learner from "../../public/images/Learners.jpg";
import { Check } from "lucide-react";

const WhyChooseUs = () => {
  
  const features = [
    {
      title: "World Class Trainers",
      keyFeatures: [
        "Online classes",
        "Expert guidance",
        "Mentorship support",
        "Real-world projects",
      ],
    },
    {
      title: "Easy Learning",
      keyFeatures: [
        "Interactive lessons",
        "Bite-sized content",
        "Quizzes & exercises",
        "Video tutorials",
      ],
    },
    {
      title: "Flexible",
      keyFeatures: [
        "Learn anytime",
        "Access from any device",
        "Self-paced courses",
        "Adjustable schedules",
      ],
    },
    {
      title: "Affordable Price",
      keyFeatures: [
        "Low-cost courses",
        "One-time payment",
        "No hidden fees",
        "Lifetime access",
      ],
    },
  ];

  return (
    <div className="h-250 flex items-center justify-between">
      <div className="w-full px-10 lg:w-1/2 flex justify-center lg:justify-end lg:pr-16">
        <div className="max-w-xl w-full">
          <div className="flex justify-end mb-4"></div>

          <button className="px-6 py-2 rounded-sm bg-[#CEF1EB] text-[#0AB99D] text-xs font-semibold uppercase tracking-wider mb-6">
            Why Choose Us
          </button>

          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#0E2A46] leading-tight">
              Creating Community Of Life
            </h1>
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#0E2A46] leading-tight">
              Long{" "}
              <span className="relative inline-block">
                Learners
                <svg
                  className="absolute top-7.5 left-0 w-full h-6"
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
              .
            </h1>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
            We believe in building a vibrant community where lifelong learners
            come together to grow, share knowledge, and inspire one another. Our
            platform supports your journey to acquire skills, explore new ideas,
            and stay motivated throughout life’s learning adventure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#F8F6F1] p-5 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-[#0AB99D] rounded-full p-1 shrink-0">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </div>
                  <h3 className="text-[#0E2A46] font-bold text-sm sm:text-base">
                    {feature.title}
                  </h3>
                </div>

                <ul className="text-gray-600 text-xs sm:text-sm ml-6 list-disc marker:text-[#0AB99D]">
                  {feature.keyFeatures.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-full w-1/2 relative  ">
        <div className=" absolute top-28 right-5">
          <Image src={dottedImg} alt="dottedImg" className=" animate-float" />
        </div>

        <div className="absolute top-30 left-4">
          <Image src={react} alt="dottedImg" />
        </div>

        <div className="h-195   overflow-hidden  w-135 absolute top-36 left-10">
          <Image
            src={Learner}
            alt="dottedImg"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute bottom-12 right-9 -z-10">
          <Image src={react2} alt="dottedImg" />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
