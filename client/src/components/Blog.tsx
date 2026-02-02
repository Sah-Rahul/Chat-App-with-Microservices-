import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MessageCircle } from "lucide-react";

import blog1 from "../../public/course/course1.jpg";
import blog2 from "../../public/course/course2.jpg";
import blog3 from "../../public/course/course3.jpg";

const blogData = [
  {
    id: 1,
    image: blog1,
    date: "14 June 2023",
    comments: "Comment (06)",
    title: "Velit esse cillum dolore eu fugiat nulla Excepteur pariatur.",
  },
  {
    id: 2,
    image: blog2,
    date: "20 June 2023",
    comments: "Comment (04)",
    title: "Excepteur sint occaecat cupidatat non proident sunt.",
  },
  {
    id: 3,
    image: blog3,
    date: "28 June 2023",
    comments: "Comment (08)",
    title: "Duis aute irure dolor in reprehenderit in voluptate.",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <div className="h-66 px-10 flex items-center justify-between">
        <div className="flex flex-col items-start pt-20 justify-start relative h-full w-1/2">
          <Button className="text-[#0BB69B] bg-[#CDF0EA] px-5 py-2 rounded font-bold uppercase tracking-wider text-xs mb-6">
            Blog Post
          </Button>

          <h1 className="text-4xl text-[#0E2A46] font-bold capitalize text-center">
            Post Popular{" "}
            <span className="relative inline-block">
              Post.
              <svg
                className="absolute left-0 -bottom-2 w-full h-4"
                viewBox="0 0 180 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 14 Q45 6, 90 10 T175 14"
                  stroke="#0AB99D"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        <div className="h-full w-1/2 flex justify-end pt-29">
          <Button className="text-white bg-[#0AB99D] px-9 py-6 rounded font-bold uppercase tracking-wider text-xs">
            All Blog Post
          </Button>
        </div>
      </div>

      <div className="px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <Card
              key={blog.id}
              className="group overflow-hidden p-5 rounded-2xl bg-[#F9F9F9]"
            >
              <div className="overflow-hidden rounded">
                <Image
                  src={blog.image}
                  alt="blog"
                  className="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0AB99D]" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#0AB99D]" />
                    <span>{blog.comments}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0E2A46] leading-snug">
                  {blog.title}
                </h3>

                <Button className="bg-[#0AB99D] text-white">Read More →</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
