"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DollarSign, List, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ChefDashboard = () => {
  const chefData = {
    name: "Chef Gordon",
    profilePic: "/images/chef.jpg",
    earnings: 4520.75,
    totalOrders: 128,
    pendingOrders: 5,
    menuItems: 20,
  };

  return (
    <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile */}
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="w-6 h-6 text-gray-700" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Image
              src={chefData.profilePic}
              alt="Chef Profile"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-lg font-semibold">{chefData.name}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="md:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-gray-700" /> Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 font-bold text-xl">{chefData.totalOrders}</p>
              <p className="text-gray-600 text-sm">Total Orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-gray-700" /> Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 font-bold text-xl">${chefData.earnings.toFixed(2)}</p>
              <p className="text-gray-600 text-sm">Total Earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <List className="w-6 h-6 text-gray-700" /> Menu Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 font-bold text-xl">{chefData.menuItems}</p>
              <p className="text-gray-600 text-sm">Total Dishes</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-gray-700" /> Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 font-bold text-xl">{chefData.pendingOrders}</p>
            <p className="text-gray-600 text-sm">Orders awaiting preparation</p>
            <Link href="/chef/orders">
              <Button className="mt-3 bg-gray-900 text-white w-full">Manage Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChefDashboard;
