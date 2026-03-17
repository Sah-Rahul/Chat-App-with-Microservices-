"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart,
  Line, PieChart, Pie, Cell, Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", students: 10, earnings: 12000 },
  { month: "Feb", students: 18, earnings: 22000 },
  { month: "Mar", students: 15, earnings: 18000 },
  { month: "Apr", students: 25, earnings: 30000 },
  { month: "May", students: 22, earnings: 26000 },
  { month: "Jun", students: 30, earnings: 36000 },
  { month: "Jul", students: 28, earnings: 33000 },
];

const coursePerformance = [
  { name: "React Course", students: 45, rating: 4.8 },
  { name: "Node.js", students: 30, rating: 4.5 },
  { name: "MongoDB", students: 20, rating: 4.2 },
  { name: "TypeScript", students: 25, rating: 4.7 },
];

const ratingData = [
  { name: "5 Star", value: 60 },
  { name: "4 Star", value: 25 },
  { name: "3 Star", value: 10 },
  { name: "1-2 Star", value: 5 },
];

const COLORS = ["#0AB99D", "#3B82F6", "#F97316", "#EF4444"];

const InstructorDashboardChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

      {/* Line Chart - Monthly Earnings */}
      <Card className="lg:col-span-2 border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-700">
            Monthly Earnings
          </CardTitle>
          <p className="text-xs text-gray-400">Your earnings trend over months</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
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
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                formatter={(value) => [`₹${value}`, "Earnings"]}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#0AB99D"
                strokeWidth={2.5}
                dot={{ fill: "#0AB99D", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart - Rating Distribution */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-700">
            Rating Distribution
          </CardTitle>
          <p className="text-xs text-gray-400">Student ratings breakdown</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={ratingData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {ratingData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "12px" }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart - Course Performance */}
      <Card className="lg:col-span-2 border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-700">
            Course Performance
          </CardTitle>
          <p className="text-xs text-gray-400">Students per course</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={coursePerformance} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "12px" }}
              />
              <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Students Bar */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-700">
            New Students
          </CardTitle>
          <p className="text-xs text-gray-400">Monthly enrollments</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "12px" }}
              />
              <Bar dataKey="students" fill="#0AB99D" radius={[4, 4, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};

export default InstructorDashboardChart;