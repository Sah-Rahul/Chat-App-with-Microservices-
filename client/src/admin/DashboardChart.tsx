"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", courses: 4, students: 40, revenue: 24000 },
  { month: "Feb", courses: 6, students: 60, revenue: 36000 },
  { month: "Mar", courses: 5, students: 55, revenue: 30000 },
  { month: "Apr", courses: 8, students: 80, revenue: 48000 },
  { month: "May", courses: 7, students: 70, revenue: 42000 },
  { month: "Jun", courses: 10, students: 100, revenue: 60000 },
  { month: "Jul", courses: 9, students: 90, revenue: 54000 },
];

const categoryData = [
  { name: "Web Dev", value: 35 },
  { name: "Mobile", value: 20 },
  { name: "Data Science", value: 25 },
  { name: "Design", value: 20 },
];

const COLORS = ["#0AB99D", "#3B82F6", "#F97316", "#8B5CF6"];

const DashboardChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

      {/* Bar Chart - Students & Courses */}
      <Card className="lg:col-span-2 border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-700">
            Monthly Overview
          </CardTitle>
          <p className="text-xs text-gray-400">Students enrolled per month</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="students" fill="#0AB99D" radius={[4, 4, 0, 0]} name="Students" />
              <Bar dataKey="courses" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Courses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart - Categories */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-700">
            Course Categories
          </CardTitle>
          <p className="text-xs text-gray-400">Distribution by category</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart - Revenue */}
      <Card className="lg:col-span-3 border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-700">
            Revenue Trend
          </CardTitle>
          <p className="text-xs text-gray-400">Monthly revenue in ₹</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
                formatter={(value) => [`₹${value}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0AB99D"
                strokeWidth={2.5}
                dot={{ fill: "#0AB99D", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};

export default DashboardChart;