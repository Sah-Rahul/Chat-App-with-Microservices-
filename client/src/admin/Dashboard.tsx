"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import { getAllCourseApi } from "../Api/services/course.service";
import { getAllCategoryAPI } from "../Api/services/category.service";

const Dashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          getAllCourseApi(),
          getAllCategoryAPI(),
        ]);

        const courses = coursesRes.data || [];
        setTotalCourses(courses.length);
        setTotalCategories((categoriesRes.data || []).length);

        // Revenue calculate karo
        const revenue = courses.reduce(
          (acc: number, c: any) => acc + (c.discountedPrice || c.price || 0),
          0
        );
        setTotalRevenue(revenue);

        // Students — agar API hai toh lagao, warna dummy
        setTotalStudents(120);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats
          totalCourses={totalCourses}
          totalStudents={totalStudents}
          totalCategories={totalCategories}
          totalRevenue={totalRevenue}
        />

        {/* Charts */}
        <DashboardChart />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;