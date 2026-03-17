import CourseDetail from "@/src/components/CourseDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

const courseDetailRoute = async ({ params }: Props) => {
  const { slug } = await params;  
  return <CourseDetail slug={slug} />;
};

export default courseDetailRoute;