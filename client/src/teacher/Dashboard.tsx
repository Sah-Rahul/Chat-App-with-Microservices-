import React from "react";
import TeacherLayout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  ClipboardList,
  CalendarCheck,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your classes, students and daily tasks
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Classes"
          value="6"
          icon={<GraduationCap className="size-6 text-primary" />}
        />
        <StatCard
          title="Total Students"
          value="180"
          icon={<Users className="size-6 text-primary" />}
        />
        <StatCard
          title="Pending Assignments"
          value="12"
          icon={<ClipboardList className="size-6 text-primary" />}
        />
        <StatCard
          title="Today’s Lectures"
          value="3"
          icon={<CalendarCheck className="size-6 text-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <Button variant="ghost" size="sm">
              View all <ArrowUpRight className="size-4 ml-1" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <DeadlineItem
              title="Math Assignment - Class 10A"
              date="25 Sep 2024"
              time="11:59 PM"
            />
            <DeadlineItem
              title="Physics Lab Report - Class 9B"
              date="27 Sep 2024"
              time="5:00 PM"
            />
            <DeadlineItem
              title="Chemistry Quiz - Class 11"
              date="30 Sep 2024"
              time="10:00 AM"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today’s Schedule</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <ScheduleItem
              subject="Mathematics"
              className="Class 10A"
              time="9:00 - 9:45 AM"
            />
            <ScheduleItem
              subject="Physics"
              className="Class 9B"
              time="10:00 - 10:45 AM"
            />
            <ScheduleItem
              subject="Chemistry"
              className="Class 11"
              time="11:00 - 11:45 AM"
            />
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon}
      </CardContent>
    </Card>
  );
}

function DeadlineItem({
  title,
  date,
  time,
}: {
  title: string;
  date: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">
          Due {date} at {time}
        </p>
      </div>
      <Clock className="size-4 text-muted-foreground" />
    </div>
  );
}

function ScheduleItem({
  subject,
  className,
  time,
}: {
  subject: string;
  className: string;
  time: string;
}) {
  return (
    <div className="rounded-md border p-3">
      <p className="font-medium text-sm">{subject}</p>
      <p className="text-xs text-muted-foreground">{className}</p>
      <p className="text-xs mt-1 text-muted-foreground">{time}</p>
    </div>
  );
}
