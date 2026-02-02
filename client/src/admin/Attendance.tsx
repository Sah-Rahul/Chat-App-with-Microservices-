"use client";

import React, { useState } from "react";
import AdminLayout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface AttendanceRecord {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Teacher";
  date: string;
  status: "Present" | "Absent";
}

const Attendance = () => {
  const [roleFilter, setRoleFilter] = useState<"All" | "Student" | "Teacher">(
    "All",
  );
  const [dateFilter, setDateFilter] = useState("");

  const records: AttendanceRecord[] = [
    {
      id: "A001",
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      date: "2026-02-02",
      status: "Present",
    },
    {
      id: "A002",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Student",
      date: "2026-02-02",
      status: "Absent",
    },
    {
      id: "A003",
      name: "Mr. Alex Brown",
      email: "alex@school.com",
      role: "Teacher",
      date: "2026-02-02",
      status: "Present",
    },
    {
      id: "A004",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Student",
      date: "2026-02-01",
      status: "Present",
    },
    {
      id: "A005",
      name: "Mrs. Lisa White",
      email: "lisa@school.com",
      role: "Teacher",
      date: "2026-02-01",
      status: "Absent",
    },
  ];

  const filteredRecords = records.filter((r) => {
    const roleMatch = roleFilter === "All" ? true : r.role === roleFilter;
    const dateMatch = dateFilter ? r.date === dateFilter : true;
    return roleMatch && dateMatch;
  });

  const totalStudents = records.filter((r) => r.role === "Student").length;
  const totalTeachers = records.filter((r) => r.role === "Teacher").length;
  const presentToday = records.filter(
    (r) =>
      r.date === new Date().toISOString().slice(0, 10) &&
      r.status === "Present",
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary">Attendance</h2>
            <p className="text-muted-foreground">
              Track student and teacher attendance by date
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="bg-white border">
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardHeader>
              <CardTitle>Total Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTeachers}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardHeader>
              <CardTitle>Present Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentToday}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Attendance Records</CardTitle>
            <div className="flex gap-2">
              <Select onValueChange={(value) => setRoleFilter(value as any)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                className="w-40"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Select Date"
              />
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.role}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          r.status === "Present"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Attendance;
