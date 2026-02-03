"use client";

import React, { useState } from "react";
import TeacherLayout from "@/src/teacher/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, XCircle } from "lucide-react";

type ClassStatus = "Pending" | "Accepted" | "Cancelled";

interface ClassType {
  id: number;
  name: string;
  section: string;
  subject: string;
  teacher: string;
  schedule: string;
  status: ClassStatus;
}

const Classes = () => {
  const [classes, setClasses] = useState<ClassType[]>([
    {
      id: 1,
      name: "Mathematics",
      section: "10A",
      subject: "Math",
      teacher: "John Doe",
      schedule: "Mon 9:00 - 10:00",
      status: "Pending",
    },
    {
      id: 2,
      name: "Physics",
      section: "10B",
      subject: "Physics",
      teacher: "John Doe",
      schedule: "Tue 11:00 - 12:00",
      status: "Accepted",
    },
    {
      id: 3,
      name: "Chemistry",
      section: "11A",
      subject: "Chemistry",
      teacher: "John Doe",
      schedule: "Wed 10:00 - 11:00",
      status: "Cancelled",
    },
  ]);

  const handleAccept = (id: number) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Accepted" } : c)),
    );
  };

  const handleCancel = (id: number) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Cancelled" } : c)),
    );
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Classes</h1>
          <p className="text-sm text-muted-foreground">
            Classes assigned by admin. You can accept or cancel a class.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">{classes.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Pending Classes</p>
                <p className="text-2xl font-bold">
                  {classes.filter((c) => c.status === "Pending").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Accepted Classes
                </p>
                <p className="text-2xl font-bold">
                  {classes.filter((c) => c.status === "Accepted").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-slate-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-left">Class Name</th>
                <th className="border px-4 py-2 text-left">Section</th>
                <th className="border px-4 py-2 text-left">Subject</th>
                <th className="border px-4 py-2 text-left">Teacher</th>
                <th className="border px-4 py-2 text-left">Schedule</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{cls.name}</td>
                  <td className="border px-4 py-2">{cls.section}</td>
                  <td className="border px-4 py-2">{cls.subject}</td>
                  <td className="border px-4 py-2">{cls.teacher}</td>
                  <td className="border px-4 py-2">{cls.schedule}</td>
                  <td className="border px-4 py-2">{cls.status}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    {cls.status === "Pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAccept(cls.id)}
                        >
                          <Check className="size-4 mr-1" /> Accept
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancel(cls.id)}
                        >
                          <XCircle className="size-4 mr-1" /> Cancel
                        </Button>
                      </>
                    )}
                    {(cls.status === "Accepted" ||
                      cls.status === "Cancelled") && (
                      <p className="text-sm text-muted-foreground">
                        {cls.status}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Classes;
