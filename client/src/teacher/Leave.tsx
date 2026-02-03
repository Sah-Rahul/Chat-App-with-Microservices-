"use client";

import React, { useState } from "react";
import TeacherLayout from "./Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Edit2 } from "lucide-react";

const Leave = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      title: "Family Function",
      description: "Going out for a wedding ceremony",
      from: "2026-02-05",
      to: "2026-02-07",
      status: "Pending",
    },
    {
      id: 2,
      title: "Medical Leave",
      description: "Fever and doctor appointment",
      from: "2026-01-20",
      to: "2026-01-22",
      status: "Approved",
    },
    {
      id: 3,
      title: "Vacation",
      description: "Short trip to hometown",
      from: "2026-01-10",
      to: "2026-01-12",
      status: "Cancelled",
    },
  ]);

  const handleUpdate = (updatedLeave: any) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === updatedLeave.id ? updatedLeave : l)),
    );
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Leave Requests
            </h1>
            <p className="text-sm text-muted-foreground">
              Apply for leave and track your requests. Status will be updated by
              Admin.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Apply for Leave</Button>
            </DialogTrigger>
            <LeaveModal
              onAdd={(newLeave) => setLeaves([...leaves, newLeave])}
            />
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Leaves" value={leaves.length} />
          <StatCard
            title="Pending Leaves"
            value={leaves.filter((l) => l.status === "Pending").length}
          />
          <StatCard
            title="Cancelled Leaves"
            value={leaves.filter((l) => l.status === "Cancelled").length}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-slate-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">From</th>
                <th className="border px-4 py-2 text-left">To</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <LeaveRow
                  key={leave.id}
                  leave={leave}
                  onUpdate={handleUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Leave;

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

function LeaveRow({
  leave,
  onUpdate,
}: {
  leave: any;
  onUpdate: (l: any) => void;
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2">{leave.title}</td>
      <td className="border px-4 py-2">{leave.description}</td>
      <td className="border px-4 py-2">{leave.from}</td>
      <td className="border px-4 py-2">{leave.to}</td>
      <td className="border px-4 py-2">{leave.status}</td>
      <td className="border px-4 py-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit2 className="size-4 mr-1" /> Edit
            </Button>
          </DialogTrigger>
          <LeaveModal leave={leave} onAdd={onUpdate} />
        </Dialog>
      </td>
    </tr>
  );
}

function LeaveModal({
  leave,
  onAdd,
}: {
  leave?: any;
  onAdd: (l: any) => void;
}) {
  const [title, setTitle] = useState(leave?.title || "");
  const [description, setDescription] = useState(leave?.description || "");
  const [from, setFrom] = useState(leave?.from || "");
  const [to, setTo] = useState(leave?.to || "");

  const handleSubmit = () => {
    if (!title || !from || !to) return;
    const newLeave = leave
      ? { ...leave, title, description, from, to }
      : { id: Date.now(), title, description, from, to, status: "Pending" };
    onAdd(newLeave);
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{leave ? "Edit Leave" : "Apply Leave"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
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
          <Label htmlFor="from">From</Label>
          <Input
            type="date"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="to">To</Label>
          <Input
            type="date"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleSubmit}>{leave ? "Update" : "Submit"}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
