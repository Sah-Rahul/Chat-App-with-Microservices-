"use client";

import { useEffect, useRef, useState } from "react"; 
import { getProfile, updateProfile } from "../Api/services/user.service";
import { Camera, Mail, Phone, User, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const user = res.data;
        setProfile(user);
        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("gender", form.gender);

      if (fileRef.current?.files?.[0]) {
        formData.append("avatar", fileRef.current.files[0]);
      }

      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </AdminLayout>
  );

  const avatarUrl = previewImage || profile?.avatar?.url || null;

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your personal information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left - Avatar Card */}
          <Card className="border border-gray-100 shadow-sm h-fit">
            <CardContent className="p-6 flex flex-col items-center">

              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 border-teal-100">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-teal-50">
                      <User size={40} className="text-teal-400" />
                    </div>
                  )}
                </div>

                {/* Camera Button */}
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full shadow-md transition-colors"
                >
                  <Camera size={14} />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <h2 className="text-lg font-bold text-gray-800">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <span className="text-xs bg-teal-50 text-teal-600 px-3 py-1 rounded-full mt-1 capitalize font-medium">
                {profile?.role || "Instructor"}
              </span>

              {/* Info */}
              <div className="w-full mt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={15} className="text-teal-500 shrink-0" />
                  <span className="truncate">{profile?.email}</span>
                </div>
                {profile?.phoneNumber && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={15} className="text-teal-500 shrink-0" />
                    <span>{profile.phoneNumber}</span>
                  </div>
                )}
                {profile?.gender && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users size={15} className="text-teal-500 shrink-0" />
                    <span className="capitalize">{profile.gender}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right - Edit Form */}
          <Card className="lg:col-span-2 border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-700 mb-5">
                Edit Information
              </h3>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-lg mb-5">
                  ✓ Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                </div>

                {/* Email - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className="w-full border border-gray-100 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-600"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>

              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;