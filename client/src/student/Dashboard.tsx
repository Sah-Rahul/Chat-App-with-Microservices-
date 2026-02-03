"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  GraduationCap,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  Megaphone,
  ClipboardList,
} from "lucide-react";
import StudentLayout from "./Layout";

const Dashboard = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <h3 className="text-2xl font-bold">120</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Present Classes</p>
                <h3 className="text-2xl font-bold">98</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Absent Classes</p>
                <h3 className="text-2xl font-bold">15</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <FileText className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Leave Applied
                </p>
                <h3 className="text-2xl font-bold">7</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={82} />
              <p className="mt-2 text-sm text-muted-foreground">
                82% Attendance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={18} /> Today’s Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Maths</span>
                <Badge>9:00 AM</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Science</span>
                <Badge variant="secondary">11:00 AM</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Computer</span>
                <Badge variant="outline">2:00 PM</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone size={18} /> Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>📢 Exam starts from 20th Feb</p>
              <p>📢 Project submission by Friday</p>
              <p>📢 Holiday on Monday</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList size={18} /> Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Maths Homework</span>
              <Badge variant="destructive">Due Tomorrow</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Science Project</span>
              <Badge variant="secondary">3 Days Left</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
