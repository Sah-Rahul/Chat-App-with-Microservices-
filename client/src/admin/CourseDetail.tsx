"use client";
import { useEffect, useState } from "react";
import { getCourseBySlugApi } from "../Api/services/course.service";

interface Props {
  slug: string;  
}

const CourseDetail = ({ slug }: Props) => {
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchCourse = async () => {
      const data = await getCourseBySlugApi(slug);
      setCourse(data);
    };
    fetchCourse();
  }, [slug]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img src={course.thumbnail} alt={course.title} className="w-full rounded-xl" />
      <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
      <p className="text-gray-400 mt-2">{course.description}</p>
      <p className="text-teal-500 font-bold text-xl mt-2">₹{course.price}</p>
    </div>
  );
};

export default CourseDetail;