"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Bell, Settings, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Notifications {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export default function ProfileSettingsPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
  });
  const [password, setPassword] = useState<string>("");
  const [notifications, setNotifications] = useState<Notifications>({
    email: true,
    sms: false,
    push: true,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNotificationChange = (name: keyof Notifications, checked: boolean) => {
    setNotifications({ ...notifications, [name]: checked });
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-green-600 p-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8" />
            Profile & Settings
          </h2>
          <p className="text-sm text-white/90 mt-1">Manage your personal information and preferences</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Personal Info Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <User className="w-6 h-6 text-primary" />
              Personal Information
              <Badge variant="outline" className="border-primary text-primary ml-auto">
                Active
              </Badge>
            </h3>
            <div className="space-y-4">
              <Input
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="bg-gray-50 border-gray-200"
              />
              <Input
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="bg-gray-50 border-gray-200"
              />
              <Input
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="bg-gray-50 border-gray-200"
              />
              <Input
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Password Update Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              Change Password
            </h3>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="bg-gray-50 border-gray-200"
            />
          </div>

          {/* Notifications Settings */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Bell className="w-6 h-6 text-primary" />
              Notification Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <Label className="font-medium">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Get text message alerts</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Enable app notifications</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white font-semibold py-3">
            <Check className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
}