"use client";

import { useState } from "react";
import AdminLayout from "./Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Bell,
  BarChart3,
  Download,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const [enrollmentPeriod, setEnrollmentPeriod] = useState("6months");

  const enrollmentData = [
    { month: "Aug", students: 145 },
    { month: "Sep", students: 198 },
    { month: "Oct", students: 234 },
    { month: "Nov", students: 189 },
    { month: "Dec", students: 276 },
    { month: "Jan", students: 312 },
  ];

  const revenueData = [
    { month: "Aug", revenue: 8450 },
    { month: "Sep", revenue: 9850 },
    { month: "Oct", revenue: 11200 },
    { month: "Nov", revenue: 10500 },
    { month: "Dec", revenue: 13800 },
    { month: "Jan", revenue: 12450 },
  ];

  const coursePerformance = [
    {
      name: "Web Development Bootcamp",
      enrollments: 324,
      completed: 245,
      revenue: 4850,
    },
    {
      name: "UI/UX Design Masterclass",
      enrollments: 256,
      completed: 198,
      revenue: 3890,
    },
    {
      name: "Machine Learning A-Z",
      enrollments: 198,
      completed: 142,
      revenue: 3250,
    },
    {
      name: "Digital Marketing Pro",
      enrollments: 167,
      completed: 134,
      revenue: 2780,
    },
    {
      name: "Python for Beginners",
      enrollments: 143,
      completed: 112,
      revenue: 2340,
    },
  ];

  const teacherActivityData = [
    { name: "Active", value: 68, color: "#10b981" },
    { name: "Inactive", value: 7, color: "#ef4444" },
  ];

  const studentActivityData = [
    { day: "Mon", logins: 845 },
    { day: "Tue", logins: 923 },
    { day: "Wed", logins: 891 },
    { day: "Thu", logins: 967 },
    { day: "Fri", logins: 1034 },
    { day: "Sat", logins: 756 },
    { day: "Sun", logins: 623 },
  ];

  const completionData = [
    { name: "Completed", value: 234, color: "#10b981" },
    { name: "Pending", value: 46, color: "#f59e0b" },
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      student: "Sarah Johnson",
      course: "Web Dev Bootcamp",
      amount: 299,
      status: "Completed",
      date: "2 mins ago",
    },
    {
      id: "TXN002",
      student: "Mike Chen",
      course: "UI/UX Design",
      amount: 249,
      status: "Completed",
      date: "15 mins ago",
    },
    {
      id: "TXN003",
      student: "Emma Davis",
      course: "Machine Learning",
      amount: 349,
      status: "Pending",
      date: "1 hour ago",
    },
    {
      id: "TXN004",
      student: "James Wilson",
      course: "Digital Marketing",
      amount: 199,
      status: "Completed",
      date: "2 hours ago",
    },
    {
      id: "TXN005",
      student: "Lisa Anderson",
      course: "Python Basics",
      amount: 149,
      status: "Completed",
      date: "3 hours ago",
    },
  ];

  const kpis = [
    {
      title: "Total Students",
      value: "980",
      change: "+12.5%",
      isPositive: true,
      icon: Users,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "from-cyan-50 to-cyan-100/50",
    },
    {
      title: "Total Teachers",
      value: "68",
      change: "+3.2%",
      isPositive: true,
      icon: BookOpen,
      color: "from-fuchsia-500 to-fuchsia-600",
      bgColor: "from-fuchsia-50 to-fuchsia-100/50",
    },
    {
      title: "Total Revenue",
      value: "$66,250",
      change: "+18.2%",
      isPositive: true,
      icon: DollarSign,
      color: "from-violet-500 to-violet-600",
      bgColor: "from-violet-50 to-violet-100/50",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 blur-3xl -z-10" />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-bold bg-linear-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-violet-600" />
                Comprehensive insights and performance metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Last 30 days
              </Button>
              <Button className="gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-0 bg-linear-to-br ${kpi.bgColor} hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/20 to-transparent rounded-full blur-2xl" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${kpi.color} text-white shadow-lg`}
                  >
                    <kpi.icon className="w-5 h-5" />
                  </div>
                  <Badge
                    className={`${
                      kpi.isPositive
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                    } border-0 gap-1`}
                  >
                    {kpi.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Enrollment Trends</CardTitle>
                  <CardDescription>
                    Monthly new student registrations
                  </CardDescription>
                </div>
                <Select
                  value={enrollmentPeriod}
                  onValueChange={setEnrollmentPeriod}
                >
                  <SelectTrigger className="w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient
                      id="enrollmentGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#enrollmentGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Revenue Overview</CardTitle>
              <CardDescription>Monthly earnings and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => `$${value}`}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#revenueGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Course Performance</CardTitle>
              <CardDescription>
                Most popular courses by enrollments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursePerformance.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate">
                        {course.name}
                      </span>
                      <span className="text-muted-foreground">
                        {course.enrollments} students
                      </span>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full"
                        style={{
                          width: `${(course.completed / course.enrollments) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{course.completed} completed</span>
                      <span className="font-semibold text-emerald-600">
                        ${course.revenue}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Teacher Activity</CardTitle>
              <CardDescription>Active vs inactive instructors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-70">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teacherActivityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {teacherActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                {teacherActivityData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                    <Badge variant="secondary">{item.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Student Activity</CardTitle>
              <CardDescription>Daily active user logins</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studentActivityData}>
                  <defs>
                    <linearGradient
                      id="activityGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="logins"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ fill: "#06b6d4", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Assignment Completion</CardTitle>
              <CardDescription>Completed vs pending tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-70">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={completionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {completionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                {completionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                    <Badge variant="secondary">{item.value}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Completion Rate
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {((234 / 280) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Transactions</CardTitle>
                <CardDescription>Latest payments and orders</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">
                      {transaction.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.student}
                    </TableCell>
                    <TableCell>{transaction.course}</TableCell>
                    <TableCell className="font-semibold text-emerald-600">
                      ${transaction.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          transaction.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }
                      >
                        {transaction.status === "Completed" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {transaction.date}
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

export default Dashboard;