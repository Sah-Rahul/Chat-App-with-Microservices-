"use client";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const GoTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-100 ${
        showButton ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
    >
      <svg className="absolute w-full h-full rotate-90">
        <circle cx="24" cy="24" r="22" strokeWidth="3" fill="none" />
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#0BB69B"
          strokeWidth="3"
          fill="none"
          strokeDasharray="138.23"
          strokeDashoffset={138.23 - (scrollProgress / 100) * 138.23}
          strokeLinecap="round"
          className="transition-all duration-100 ease-out"
        />
      </svg>

      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-black text-white shadow-lg relative z-10">
        <ChevronUp size={25} />
      </div>
    </div>
  );
};

export default GoTop;
