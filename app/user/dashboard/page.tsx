"use client";

import { User, CreditCard, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePic: "/images/profile.jpg",
    subscription: { plan: "Premium", expiry: "2025-12-31", status: "Active" },
    recentOrders: [
      { id: "1", item: "Sushi Platter", price: 18.99, date: "2025-02-20", status: "Delivered" },
      { id: "2", item: "Butter Chicken", price: 15.99, date: "2025-02-18", status: "In Progress" },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile & Subscription */}
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="w-6 h-6 text-gray-700" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <img src={user.profilePic} alt="Profile" className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-gray-700" /> Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 font-medium">Plan: {user.subscription.plan}</p>
            <p className="text-gray-600 text-sm">Expires: {user.subscription.expiry}</p>
            <p className={`text-sm ${user.subscription.status === "Active" ? "text-green-600" : "text-red-600"}`}>{user.subscription.status}</p>
            <Button className="mt-3 bg-gray-900 text-white w-full">Manage Subscription</Button>
          </CardContent>
        </Card>
      </div>

      {/* Orders Section */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-gray-700" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.recentOrders.length === 0 ? (
              <p className="text-gray-600 text-center">No recent orders.</p>
            ) : (
              <div className="space-y-3">
                {user.recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="text-gray-800 font-medium">{order.item}</p>
                      <p className="text-gray-600 text-sm">${order.price.toFixed(2)} - {order.date}</p>
                    </div>
                    <span className={`text-sm ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
