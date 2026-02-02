import React from "react";
import Image from "next/image";
import Newsletter1 from "../../public/images/Newsletter1.png";
import Newsletter2 from "../../public/images/Newsletter2.png";
import spin from "../../public/images/whiteSpin.png";
import moveImg from "../../public/images/whiteMove.png";

const Newsletter = () => {
  return (
    <div className="h-72 relative bg-[#0AB99D]">
      <Image src={Newsletter2} alt="nNewsletter" />
      <div className="absolute bottom-0 right-0">
        <Image src={Newsletter1} alt="nNewsletter" />
      </div>
      <div className="absolute bottom-5 left-35">
        <Image src={spin} alt="nNewsletter" className="rotate-spin" />
      </div>
      <div className="absolute top-7 right-30">
        <Image src={moveImg} alt="nNewsletter" className="rotate-spin" />
      </div>

      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-10 px-6 z-10">
        <div className="text-white text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            Subscribe Newsletter
          </h2>
          <p className="text-white/90 text-xl mt-2">
            Get Every Latest News & Update
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full h-16  bg-white rounded px-8 pr-36 outline-none text-gray-800 shadow-lg"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-[#000000] text-white px-7 rounded cursor-pointer font-bold  ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
