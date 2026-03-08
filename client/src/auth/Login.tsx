"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { loginApi, LoginDto } from "../Api/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginApi(formData as LoginDto);

      toast.success(response.message);

      router.push("/dashboard");

      console.log("Login response:", response);
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-20%] right-[-10%] w-125 h-125 rounded-full bg-[#0ab89c] blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-125 h-125 rounded-full bg-teal-500 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 text-[#0ab89c] rounded-xl flex items-center justify-center">
              <GraduationCap className="text-[#0ab89c] h-6 w-6" />
            </div>
            <span className="text-white font-bold text-2xl">
              Educate Portal
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            Unlock your potential with{" "}
            <span className="text-[#0ab89c]">innovative learning.</span>
          </h1>

          <div className="space-y-6 mt-10">
            <div className="flex gap-4">
              <BookOpen className="h-5 w-5 text-[#0ab89c]" />
              <div>
                <p className="text-white font-semibold">Hands-on Courses</p>
                <p className="text-sm text-zinc-400">
                  Learn practical skills through real projects
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <LayoutDashboard className="h-5 w-5 text-[#0ab89c]" />
              <div>
                <p className="text-white font-semibold">Grow Your Career</p>
                <p className="text-sm text-zinc-400">
                  Build a portfolio, earn certificates, and boost your resume
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-black">
        <form onSubmit={handleSubmit} className="w-full max-w-105 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Student Register
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Create your account to start learning today.
            </p>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="rahul@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="border border-zinc-300 dark:border-zinc-700 dark:bg-black dark:text-white focus:border-[#09b89b] focus:ring-0"
              />
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="password" className="dark:text-white">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="border border-zinc-300 dark:border-zinc-700 dark:bg-black dark:text-white pr-10 focus:border-[#09b89b] focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 cursor-pointer text-zinc-500 dark:text-zinc-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#09b89b] hover:bg-[#09b89b] h-12 cursor-pointer"
            >
              Login
            </Button>
          </div>

          <p className="text-center text-sm text-zinc-600">
            I don't have an account?{" "}
            <Link
              href={"/auth/register"}
              className="font-bold text-[#0ab89c] cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
