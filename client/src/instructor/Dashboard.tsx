"use client";

import { useEffect, useState } from "react";
import InstructorLayout from "./InstructorLayout";
import InstructorDashboardStats from "./InstructorDashboardStats";
import InstructorDashboardChart from "./InstructorDashboardChart";
import { getInstructorCoursesApi } from "../Api/services/course.service";

const Dashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // LocalStorage se user lo
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const instructorId = user?._id || user?.userId;

        if (!instructorId) return;

        const res = await getInstructorCoursesApi(instructorId);
        const courses = res.data || [];

        setTotalCourses(courses.length);

        const students = courses.reduce(
          (acc: number, c: any) => acc + (c.totalEnrollments || 0), 0
        );
        setTotalStudents(students);

        const earnings = courses.reduce(
          (acc: number, c: any) =>
            acc + (c.discountedPrice || c.price || 0) * (c.totalEnrollments || 0),
          0
        );
        setTotalEarnings(earnings);

        const reviews = courses.reduce(
          (acc: number, c: any) => acc + (c.totalReviews || 0), 0
        );
        setTotalReviews(reviews);

        const totalRating = courses.reduce(
          (acc: number, c: any) => acc + (c.rating || 0), 0
        );
        setAverageRating(
          courses.length > 0 ? totalRating / courses.length : 0
        );

        const pending = courses.filter(
          (c: any) => c.status === "under_review"
        ).length;
        setPendingRequests(pending);

      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <InstructorLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Instructor Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back! Here's your performance overview.
          </p>
        </div>

        <InstructorDashboardStats
          totalCourses={totalCourses}
          totalStudents={totalStudents}
          totalEarnings={totalEarnings}
          pendingRequests={pendingRequests}
          averageRating={averageRating}
          totalReviews={totalReviews}
        />

        <InstructorDashboardChart />
      </div>
    </InstructorLayout>
  );
};

export default Dashboard;