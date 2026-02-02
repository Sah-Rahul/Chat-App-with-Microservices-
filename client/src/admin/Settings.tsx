"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Globe,
  Mail,
  Save,
  Smartphone,
  Lock,
  Eye,
  Database,
  Trash2,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "./Layout";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and system settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Settings Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  General
                </Button>

                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>

                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </Button>

                <Button variant="ghost" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  Appearance
                </Button>

                <Button variant="ghost" className="w-full justify-start">
                  <Database className="w-4 h-4 mr-2" />
                  Data & Privacy
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                  <CardDescription>
                    Basic configuration for your account
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="np">नेपाली</SelectItem>
                        <SelectItem value="hi">हिन्दी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="IST">IST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Label>Email Notifications</Label>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <Label>Push Notifications</Label>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* 2FA */}
                  <div className="flex justify-between items-center">
                    <Label>Two Factor Auth</Label>
                    <Switch
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>

                  {twoFactorAuth && (
                    <Badge className="w-fit bg-green-500">Enabled</Badge>
                  )}

                  <Separator />

                  {/* CHANGE PASSWORD */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Change Password</h4>

                    <div className="space-y-2">
                      <Label htmlFor="oldPassword">Old Password</Label>
                      <Input
                        id="oldPassword"
                        type="password"
                        placeholder="Enter old password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>

                    <Button className="w-fit" size="sm">
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Switch /> Dark Mode
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
