"use client";

import React, { useState } from "react";
import TeacherLayout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Upload, Trash2, Edit2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Homework",
      className: "Class 10A",
      due: "25 Sep 2024",
      students: ["Rahul", "Riya", "Aman"],
      submissions: { submitted: 2, pending: 1 },
      status: "Draft",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      className: "Class 9B",
      due: "27 Sep 2024",
      students: ["Sonia", "Arjun", "Kriti"],
      submissions: { submitted: 3, pending: 0 },
      status: "Published",
    },
    {
      id: 3,
      title: "Chemistry Quiz",
      className: "Class 11",
      due: "30 Sep 2024",
      students: ["Vikram", "Neha"],
      submissions: { submitted: 1, pending: 1 },
      status: "Draft",
    },
  ]);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
            <p className="text-sm text-muted-foreground">
              Assign tasks to your students and track progress
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Assignment</Button>
            </DialogTrigger>
            <AssignmentModal
              onAdd={(assignment) =>
                setAssignments((prev) => [...prev, assignment])
              }
            />
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Total Assignments" value={assignments.length} />
          <StatCard
            title="Pending Assignments"
            value={assignments.filter((a) => a.status === "Draft").length}
          />
          <StatCard
            title="Published Assignments"
            value={assignments.filter((a) => a.status === "Published").length}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10A">Class 10A</SelectItem>
                <SelectItem value="10B">Class 10B</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" className="w-40" placeholder="Filter by Date" />
          </div>
          <Button variant="outline" size="sm">
            Apply Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-slate-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Class</th>
                <th className="border px-4 py-2 text-left">Due Date</th>
                <th className="border px-4 py-2 text-left">
                  Assigned Students
                </th>
                <th className="border px-4 py-2 text-left">Submission</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <AssignmentRow key={a.id} assignment={a} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Assignments;

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AssignmentRow({
  assignment,
}: {
  assignment: {
    id: number;
    title: string;
    className: string;
    due: string;
    students: string[];
    submissions: { submitted: number; pending: number };
    status: string;
  };
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2">{assignment.title}</td>
      <td className="border px-4 py-2">{assignment.className}</td>
      <td className="border px-4 py-2">{assignment.due}</td>
      <td className="border px-4 py-2">{assignment.students.join(", ")}</td>
      <td className="border px-4 py-2">
        Submitted: {assignment.submissions.submitted} | Pending:{" "}
        {assignment.submissions.pending}
      </td>
      <td className="border px-4 py-2">{assignment.status}</td>
      <td className="border px-4 py-2 flex gap-2">
        <Button variant="outline" size="sm">
          <Edit2 className="size-4 mr-1" /> Edit
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="size-4 mr-1" /> Delete
        </Button>
      </td>
    </tr>
  );
}

function AssignmentModal({ onAdd }: { onAdd: (a: any) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [className, setClassName] = useState("");
  const [due, setDue] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");

  const handleAdd = () => {
    if (!title || !className || !due) return;
    onAdd({
      id: Date.now(),
      title,
      description,
      className,
      due,
      students: [],
      submissions: { submitted: 0, pending: 0 },
      status,
    });
    setTitle("");
    setDescription("");
    setClassName("");
    setDue("");
    setStatus("Draft");
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Create Assignment</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Assignment Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="class">Assign to Class</Label>
          <Select onValueChange={(v) => setClassName(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10A">Class 10A</SelectItem>
              <SelectItem value="10B">Class 10B</SelectItem>
              <SelectItem value="11">Class 11</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="class">Assign to Student</Label>
          <Select onValueChange={(v) => setClassName(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10A">Class 10A</SelectItem>
              <SelectItem value="10B">Class 10B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="due">Due Date</Label>
          <div className="relative">
            <Input
              type="date"
              className="pl-10"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
            <Calendar className="absolute left-3 top-3 size-4 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(v) => setStatus(v as "Draft" | "Published")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="size-4 mr-1" /> Upload File
          </Button>
          <span className="text-sm text-muted-foreground">
            PDF, DOCX, Images
          </span>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleAdd}>Add Assignment</Button>
      </DialogFooter>
    </DialogContent>
  );
}
