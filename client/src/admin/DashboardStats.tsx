import { BookOpen, Users, LayoutGrid, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  totalCourses: number;
  totalStudents: number;
  totalCategories: number;
  totalRevenue: number;
}

const DashboardStats = ({
  totalCourses,
  totalStudents,
  totalCategories,
  totalRevenue,
}: Props) => {
  const stats = [
    {
      title: "Total Courses",
      value: totalCourses,
      icon: <BookOpen size={22} className="text-teal-500" />,
      bg: "bg-teal-50",
      change: "+12% this month",
      changeColor: "text-green-500",
    },
    {
      title: "Total Students",
      value: totalStudents,
      icon: <Users size={22} className="text-blue-500" />,
      bg: "bg-blue-50",
      change: "+8% this month",
      changeColor: "text-green-500",
    },
    {
      title: "Total Categories",
      value: totalCategories,
      icon: <LayoutGrid size={22} className="text-orange-500" />,
      bg: "bg-orange-50",
      change: "+3 new added",
      changeColor: "text-orange-500",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <TrendingUp size={22} className="text-purple-500" />,
      bg: "bg-purple-50",
      change: "+20% this month",
      changeColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, i) => (
        <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <div className={`${stat.bg} p-2.5 rounded-lg`}>{stat.icon}</div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className={`text-xs font-medium ${stat.changeColor}`}>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;