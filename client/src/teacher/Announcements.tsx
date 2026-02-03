"use client";

import React, { useState } from "react";
import TeacherLayout from "./Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Edit2 } from "lucide-react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Holiday on Feb 14",
      description: "Valentine's Day holiday",
      type: "Holiday",
      date: "2026-02-14",
      status: "Pending",
    },
    {
      id: 2,
      title: "Class Test - Math",
      description: "Chapter 5 & 6",
      type: "Class Test",
      date: "2026-02-10",
      status: "Approved",
    },
  ]);

  const handleUpdate = (updated: any) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a)),
    );
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
            <p className="text-sm text-muted-foreground">
              Create announcements. Admin approval required before sending to
              students.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Announcement</Button>
            </DialogTrigger>
            <AnnouncementModal
              onAdd={(a) => setAnnouncements([...announcements, a])}
            />
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Announcements" value={announcements.length} />
          <StatCard
            title="Pending"
            value={announcements.filter((a) => a.status === "Pending").length}
          />
          <StatCard
            title="Approved"
            value={announcements.filter((a) => a.status === "Approved").length}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-slate-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Type</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <AnnouncementRow
                  key={a.id}
                  announcement={a}
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

export default Announcements;

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

function AnnouncementRow({
  announcement,
  onUpdate,
}: {
  announcement: any;
  onUpdate: (a: any) => void;
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2">{announcement.title}</td>
      <td className="border px-4 py-2">{announcement.description}</td>
      <td className="border px-4 py-2">{announcement.type}</td>
      <td className="border px-4 py-2">{announcement.date}</td>
      <td className="border px-4 py-2">{announcement.status}</td>
      <td className="border px-4 py-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit2 className="size-4 mr-1" /> Edit
            </Button>
          </DialogTrigger>
          <AnnouncementModal announcement={announcement} onAdd={onUpdate} />
        </Dialog>
      </td>
    </tr>
  );
}

function AnnouncementModal({
  announcement,
  onAdd,
}: {
  announcement?: any;
  onAdd: (a: any) => void;
}) {
  const [title, setTitle] = useState(announcement?.title || "");
  const [description, setDescription] = useState(
    announcement?.description || "",
  );
  const [type, setType] = useState(announcement?.type || "");
  const [date, setDate] = useState(announcement?.date || "");

  const handleSubmit = () => {
    if (!title || !type || !date) return;
    const newAnnounce = announcement
      ? { ...announcement, title, description, type, date } // edit
      : { id: Date.now(), title, description, type, date, status: "Pending" }; // new
    onAdd(newAnnounce);
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {announcement ? "Edit Announcement" : "New Announcement"}
        </DialogTitle>
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
          <Label htmlFor="type">Type</Label>
          <Select onValueChange={(v) => setType(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Holiday">Holiday</SelectItem>
              <SelectItem value="Class Test">Class Test</SelectItem>
              <SelectItem value="Assignment">Assignment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleSubmit}>
          {announcement ? "Update" : "Submit"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
