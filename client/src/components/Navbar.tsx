"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin, User, ShoppingCart, ChevronDown } from "lucide-react";
import logo from "../../public/images/logo.webp";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home" }, 
  { name: "Courses"},
  { name: "Blog"},
  { name: "Compailer"},
  { name: "Online Counselling"},
  
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <div
        className={`bg-white px-10 border-b overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "h-0 opacity-0 -translate-y-full" : "h-12 opacity-100"
        }`}
      >
        <div className="h-12  flex items-center justify-between text-sm text-gray-600">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>(+977) 9811223300</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>New Road of Kathmandu ,522</span>
            </div>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <User size={16} />
            <span>Login / Register</span>
          </div>
        </div>
      </div>

      <div
        className={`sticky  top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="h-20 px-10 bg-[#1a7269]   flex items-center justify-between">
          <div className="text-white text-2xl font-bold flex items-center gap-2">
            <Link href={"/"}>
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          <nav className="flex gap-8 text-white font-medium">
            {navLinks.map((link, i) => (
              <div
                key={i}
                className="flex items-center gap-1 cursor-pointer hover:text-[#22b9a0] transition"
              >
                {link.name}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <ShoppingCart className="text-white cursor-pointer" />
            <button className="bg-white text-green-800 px-5 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
              Contact Us →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
