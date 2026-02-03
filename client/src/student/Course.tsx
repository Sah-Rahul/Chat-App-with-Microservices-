"use client";

import React, { useState } from "react";
import StudentLayout from "./Layout";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  BookOpen,
  Clock,
  User,
  Search,
  CheckCircle,
  PlayCircle,
  Layers,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    instructor: "Rahul Sharma",
    progress: 75,
    status: "Active",
    duration: "6 Months",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    instructor: "Anjali Verma",
    progress: 40,
    status: "Active",
    duration: "4 Months",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "UI/UX Design Basics",
    instructor: "Neha Singh",
    progress: 100,
    status: "Completed",
    duration: "2 Months",
    color: "from-orange-500 to-pink-500",
  },
];

const Course = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (c) => c.status === "Completed",
  ).length;
  const inProgressCourses = courses.filter((c) => c.status === "Active").length;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || course.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <Layers className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <h3 className="text-2xl font-bold">{totalCourses}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <PlayCircle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <h3 className="text-2xl font-bold">{inProgressCourses}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{completedCourses}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
            <p className="text-muted-foreground">
              Manage and continue your learning
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs defaultValue="All" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Active">In Progress</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="group overflow-hidden border hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-28 bg-linear-to-r ${course.color} relative`}>
                <Badge className="absolute top-3 right-3 bg-white text-black">
                  {course.status === "Completed" ? "Completed" : "In Progress"}
                </Badge>

                <div className="absolute bottom-3 left-4 text-white font-semibold text-lg">
                  {course.title}
                </div>
              </div>

              <CardContent className="space-y-5 pt-5">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {course.instructor}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {course.duration}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Course Progress
                    </span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>

                <Button
                  className="w-full"
                  variant={
                    course.status === "Completed" ? "secondary" : "default"
                  }
                >
                  <BookOpen size={16} className="mr-2" />
                  {course.status === "Completed"
                    ? "View Course"
                    : "Continue Learning"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              No courses found.
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
};

export default Course;
