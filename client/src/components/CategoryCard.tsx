import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Category } from "./Categories";

interface Props {
  item: Category;
}

const CategoryCard = ({ item }: Props) => {
  return (
    <Card
      className="
        group w-full max-w-70 h-82   
        rounded-2xl border-none
        bg-[#f2f3f3]
        flex items-center
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-xl hover:bg-[#0ab99d]
      "
    >
      <CardContent className="flex flex-col items-center text-center p-8 w-full">
        <div className="relative mb-8 flex items-center justify-center">
          <div
            className="
              absolute w-28 h-28 rounded-full 
              border-2 border-dashed border-[#1a7368]
              transition-transform duration-500
              group-hover:rotate-180
              -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2
            "
          />

          <div
            className="
              relative z-10 w-24 h-24 bg-[#0ab99d] flex items-center justify-center rounded-full
              transition-colors duration-500
              group-hover:bg-white
            "
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={32}
              height={32}
              className="transition-all duration-500"
            />
          </div>
        </div>

        <CardTitle className="text-lg font-semibold text-gray-600 transition-colors duration-300 group-hover:text-white">
          {item.label}
        </CardTitle>

        <p className="mt-3 flex items-center gap-1 text-sm text-gray-500 transition-colors duration-300 group-hover:text-white">
          {item.course}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
