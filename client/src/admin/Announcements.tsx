"use client";

import React, { useState } from "react";
import AdminLayout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  status: "Published" | "Draft";
}

const Announcements = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | "Published" | "Draft">("All");

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "AN001",
      title: "New Course Launch",
      category: "Courses",
      content: "We are excited to launch a new React course this month.",
      date: "2026-02-02",
      status: "Published",
    },
    {
      id: "AN002",
      title: "Maintenance Notice",
      category: "System",
      content: "The LMS will be down for maintenance on 5th Feb 2026.",
      date: "2026-02-01",
      status: "Draft",
    },
    {
      id: "AN003",
      title: "Webinar on Next.js",
      category: "Events",
      content: "Join our webinar on Next.js advanced features.",
      date: "2026-01-28",
      status: "Published",
    },
  ]);

  const addAnnouncement = (newAnn: Announcement) => {
    setAnnouncements([...announcements, newAnn]);
    setOpen(false);
  };

  const removeAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const filteredAnnouncements =
    filter === "All"
      ? announcements
      : announcements.filter((ann) => ann.status === filter);

  const stats = [
    { title: "Total Announcements", value: announcements.length },
    {
      title: "Published",
      value: announcements.filter((a) => a.status === "Published").length,
    },
    {
      title: "Drafts",
      value: announcements.filter((a) => a.status === "Draft").length,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary">Announcements</h2>
            <p className="text-muted-foreground">
              Create, filter, and manage announcements for your LMS
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Announcements</CardTitle>

            <div className="flex gap-2">
              <Select onValueChange={(value) => setFilter(value as any)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white gap-2">
                    <Plus className="w-4 h-4" /> Add Announcement
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Announcement</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input placeholder="Enter announcement title" />
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Courses">Courses</SelectItem>
                          <SelectItem value="System">System</SelectItem>
                          <SelectItem value="Events">Events</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea placeholder="Enter announcement content" />
                    </div>
                  </div>

                  <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-primary text-white">Publish</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredAnnouncements.map((ann) => (
                  <TableRow key={ann.id}>
                    <TableCell className="font-medium">{ann.title}</TableCell>
                    <TableCell>{ann.category}</TableCell>
                    <TableCell>{ann.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          ann.status === "Published"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {ann.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAnnouncement(ann.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default Announcements;
