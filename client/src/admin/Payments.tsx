"use client";

import React, { useState } from "react";
import AdminLayout from "./Layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
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

interface Payment {
  id: string;
  user: string;
  email: string;
  course: string;
  payment_id: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending";
}

const Payments = () => {
  const [filter, setFilter] = useState<"All" | "Paid" | "Pending">("All");

  const payments: Payment[] = [
    {
      id: "P001",
      user: "John Doe",
      email: "john@example.com",
      course: "React Basics",
      payment_id: "#fdgdgf",
      amount: "$50",
      date: "2026-02-01",
      status: "Paid",
    },
    {
      id: "P002",
      user: "Jane Smith",
      email: "jane@example.com",
      course: "Next.js Advanced",
      payment_id: "#fdg546",
      amount: "$70",
      date: "2026-02-02",
      status: "Pending",
    },
    {
      id: "P003",
      user: "Alice Johnson",
      email: "alice@example.com",
      course: "UI/UX Design",
      payment_id: "#fdgrew5",
      amount: "$40",
      date: "2026-01-30",
      status: "Paid",
    },
    {
      id: "P004",
      user: "Bob Williams",
      email: "bob@example.com",
      course: "JavaScript Fundamentals",
      payment_id: "#fddfgdf31",
      amount: "$60",
      date: "2026-01-28",
      status: "Paid",
    },
  ];

  const filteredPayments =
    filter === "All" ? payments : payments.filter((p) => p.status === filter);

  const stats = [
    { title: "Total Payments", value: payments.length },
    {
      title: "Paid",
      value: payments.filter((p) => p.status === "Paid").length,
    },
    {
      title: "Pending",
      value: payments.filter((p) => p.status === "Pending").length,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary">Payments</h2>
            <p className="text-muted-foreground">
              View all course purchase transactions by users
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="grid gap-6 sm:grid-cols-3 flex-1">
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
        </div>

        <Card className="bg-white">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Payments</CardTitle>

            <div className="w-40">
              <Select onValueChange={(value) => setFilter(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Filter</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Payment_id</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.user}
                    </TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell>{payment.course}</TableCell>
                    <TableCell>{payment.payment_id}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          payment.status === "Paid"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {payment.status}
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

export default Payments;
