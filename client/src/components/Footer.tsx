import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Twitter, ChevronRight } from "lucide-react";
import logo from "../../public/images/logo.webp";
import Link from "next/link";

const Footer = () => {
  const services = [
    "Web Development",
    "UI/UX Design",
    "Management",
    "Digital Marketing",
    "Blog News",
  ];

  const quickLinks = [
    "Templates",
    "Blog And Article",
    "Integrations",
    "Webinars",
    "Privacy & Policy",
  ];

  const galleryImages = [
    "/images/gallery1.webp",
    "/images/gallery2.webp",
    "/images/gallery3.webp",
    "/images/gallery4.webp",
    "/images/gallery5.webp",
    "/images/gallery6.webp",
  ];

  return (
    <footer className="bg-[#1a1d2e] text-white">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Link href={"/"}>
                <Image src={logo} alt="logo" />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Interdum velit laoreet id donec ultrices tincidunt arcu. Tincidunt
              tortor aliquam nulla facilisi cras fermentum odio eu.
            </p>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 hover:bg-teal-600 transition flex items-center justify-center cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-700 hover:bg-teal-600 transition flex items-center justify-center cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-700 hover:bg-teal-600 transition flex items-center justify-center cursor-pointer">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0a12 12 0 0 0-4 23.34V15H5.7V12H8V9.35c0-2.3 1.37-3.57 3.47-3.57 1 0 2.06.18 2.06.18V8.3h-1.16c-1.14 0-1.5.71-1.5 1.44V12h2.55l-.41 3H10.87v8.34A12 12 0 0 0 12 0z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-700 hover:bg-teal-600 transition flex items-center justify-center cursor-pointer">
                <Twitter size={18} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Our Services:</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 hover:text-teal-400 transition w-fit text-gray-400 cursor-pointer group"
                >
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span className="text-sm  ">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links:</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 w-fit text-gray-400 hover:text-teal-400 transition cursor-pointer group"
                >
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span className="text-sm">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="relative h-20 rounded overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-60 transition-opacity z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-5">
          <p className="text-center text-sm text-gray-400">
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-teal-400 font-semibold">Educate</span> || All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
