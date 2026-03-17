"use client";

import React from "react";
import InstructorLayout from "./InstructorLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Lock, Camera } from "lucide-react";

const Setting = () => {
  return (
    <InstructorLayout>
      <div className="p-4 sm:p-8 max-w-5xl mx-auto bg-[#f2f2f2] min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Settings
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white border p-1 h-auto flex flex-wrap sm:inline-flex justify-start gap-1">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 px-4 py-2"
            >
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Lock size={16} /> Account
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Bell size={16} /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Public Profile</CardTitle>
                <CardDescription>
                  This information will be displayed publicly to students.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md">
                      <img
                        src="https://ui-avatars.com/api/?name=Instructor&background=0AB99D&color=fff&size=128"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-[#0AB99D] text-white rounded-full shadow-lg hover:bg-[#089c84] transition-colors">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold">Profile Photo</h4>
                    <p className="text-sm text-slate-500">
                      JPG, GIF or PNG. Max size of 2MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                      id="fname"
                      placeholder="John"
                      className="bg-slate-50 border-slate-200 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                      id="lname"
                      placeholder="Doe"
                      className="bg-slate-50 border-slate-200 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    placeholder="Senior Full Stack Developer & Instructor"
                    className="bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your students about yourself..."
                    className="min-h-30 bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50/50 border-t p-6 flex justify-end">
                <Button className="bg-[#0AB99D] hover:bg-[#089c84] px-8">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Update your email and change your password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-700">
                    Change Password
                  </h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Password</Label>
                      <Input
                        id="current"
                        type="password"
                        underline-none
                        className="bg-slate-50 border-slate-200 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <Input
                        id="new"
                        type="password"
                        underline-none
                        className="bg-slate-50 border-slate-200 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50/50 border-t p-6 flex justify-end">
                <Button className="bg-[#0AB99D] hover:bg-[#089c84]">
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Decide what messages you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-base">New Student Enrollment</Label>
                    <span className="text-sm text-slate-500">
                      Notify me when a student joins my course.
                    </span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-base">Course Reviews</Label>
                    <span className="text-sm text-slate-500">
                      Get notified when a student leaves a review.
                    </span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-base">Direct Messages</Label>
                    <span className="text-sm text-slate-500">
                      Receive emails for new messages from students.
                    </span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InstructorLayout>
  );
};

export default Setting;
