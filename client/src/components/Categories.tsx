import CategoryCard from "./CategoryCard";
import artImg from "../../public/categories/art.png";
import barsImg from "../../public/categories/bars.png";
import codingImg from "../../public/categories/coding.png";
import mobileDevelopmentImg from "../../public/categories/mobile-development.png";
import promotionImg from "../../public/categories/promotion.png";
import uxImg from "../../public/categories/ux-design.png";
import webDesignImg from "../../public/categories/web-design.png";
import arrowImg from "../../public/images/shape-1.webp";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

export interface Category {
  label: string;
  course: string;
  icon: StaticImageData;
}
const categories: Category[] = [
  { label: "Web Design", course: "20 Courses", icon: webDesignImg },
  { label: "Graphic Design", course: "21 Courses", icon: uxImg },
  { label: "Personal Design", course: "8 Courses", icon: artImg },
  { label: "IT And Software", course: "10 Courses", icon: codingImg },
  { label: "Sales Marketing", course: "17 Courses", icon: promotionImg },
  { label: "Art & Humanities", course: "13 Courses", icon: barsImg },
  {
    label: "Mobile Application",
    course: "15 Courses",
    icon: mobileDevelopmentImg,
  },
  { label: "Finance & Accounting", course: "25 Courses", icon: barsImg },
];

const CategoriesSection = () => {
  return (
    <section className="mt-10 px-4">
      <div className="h-36   flex items-center px-6 md:px-12">
         
        <div>
          <button className="bg-[#cef0ea] px-12 py-2 rounded-sm font-semibold text-[#0ab99d] uppercase text-sm">
            Categories
          </button>
          <h2 className="mt-2  font-bold text-4xl text-gray-700">
            Browse By Categories
          </h2>
        </div>
 
        <div className="ml-auto flex items-center gap-3">
          <Image
            src={arrowImg}
            alt="Arrow icon"
            width={180}
            height={180}
            className="object-contain mr-10"
          />

          <div>
            <button className="bg-[#0ab89c] text-white font-semibold px-6 py-3 rounded-md cursor-pointer transition flex items-center gap-2">
              All Categories
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-6 place-items-center mb-10">
        {categories.map((item, index) => (
          <CategoryCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
