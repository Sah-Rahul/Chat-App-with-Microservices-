"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { getAllStudents } from "../Api/services/user.service";
import { toast } from "sonner";
import StudentsTable from "./studentsTable";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "super_admin" | "instructor" | "student";
  status: "active" | "inactive";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isSuspended: boolean;
  createdAt: string;
}

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white rounded-2xl border border-zinc-200 p-5">
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
      {label}
    </p>
    <p className="text-3xl font-extrabold mt-1 text-zinc-900">{value}</p>
  </div>
);

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Student | null>(null);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllStudents();
      setStudents(res.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Users" value={students.length} />
          <StatCard
            label="Active"
            value={students.filter((s) => s.status === "active").length}
          />
          <StatCard
            label="Verified Email"
            value={students.filter((s) => s.isEmailVerified).length}
          />
        </div>

        <StudentsTable
          students={students}
          loading={loading}
          onView={(student) => setSelected(student)}
        />

        {selected && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-bold text-lg mb-4">
                {selected.firstName} {selected.lastName}
              </h2>

              <div className="space-y-2 text-sm">
                <p>
                  <b>Email:</b> {selected.email}
                </p>
                <p>
                  <b>Role:</b> {selected.role}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {selected.isSuspended ? "Suspended" : selected.status}
                </p>
                <p>
                  <b>Email Verified:</b>{" "}
                  {selected.isEmailVerified ? "Yes" : "No"}
                </p>
                <p>
                  <b>Phone Verified:</b>{" "}
                  {selected.isPhoneVerified ? "Yes" : "No"}
                </p>
                <p>
                  <b>Joined:</b>{" "}
                  {new Date(selected.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-4 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Students;
