"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Bell } from "lucide-react";

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

  const handleNotificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <User className="w-6 h-6" /> Profile & Settings
      </h2>

      {/* Personal Info Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Personal Info</h3>
        <Input
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          className="mb-3"
          placeholder="Full Name"
        />
        <Input
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleInputChange}
          className="mb-3"
          placeholder="Email Address"
        />
        <Input
          name="phone"
          value={userInfo.phone}
          onChange={handleInputChange}
          className="mb-3"
          placeholder="Phone Number"
        />
        <Input
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
      </div>

      {/* Password Update Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center gap-2">
          <Lock className="w-5 h-5" /> Change Password
        </h3>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="New Password"
        />
      </div>

      {/* Notifications Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notification Settings
        </h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="email"
              checked={notifications.email}
              onChange={handleNotificationChange}
            />
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sms"
              checked={notifications.sms}
              onChange={handleNotificationChange}
            />
            SMS Notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="push"
              checked={notifications.push}
              onChange={handleNotificationChange}
            />
            Push Notifications
          </label>
        </div>
      </div>

      {/* Save Button */}
      <Button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
        Save Changes
      </Button>
    </div>
  );
}
