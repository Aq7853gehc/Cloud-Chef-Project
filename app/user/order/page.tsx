"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Truck, RefreshCcw } from "lucide-react";

const orders = [
  {
    id: "101",
    item: "Margherita Pizza",
    price: 14.99,
    status: "Delivered",
    date: "2025-02-20",
    tracking: "Your order was delivered successfully."
  },
  {
    id: "102",
    item: "Spaghetti Carbonara",
    price: 12.99,
    status: "Out for Delivery",
    date: "2025-02-21",
    tracking: "Your order is on the way! Expected delivery: 30 mins."
  },
  {
    id: "103",
    item: "Sushi Platter",
    price: 18.99,
    status: "Processing",
    date: "2025-02-22",
    tracking: "Your order is being prepared."
  }
];

export default function OrdersPage() {
  const [trackingInfo, setTrackingInfo] = useState<{ [key: string]: boolean }>({});

  const toggleTracking = (orderId: string) => {
    setTrackingInfo((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{order.item}</h3>
                <p className="text-gray-600">Order ID: {order.id}</p>
                <p className="text-gray-600">Date: {order.date}</p>
                <p className={`font-medium mt-2 ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}>{order.status}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">${order.price.toFixed(2)}</p>
                <div className="mt-4 flex gap-3">
                  <Button onClick={() => toggleTracking(order.id)} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                    <Truck className="w-4 h-4 mr-2" /> Track Order
                  </Button>
                  <Button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Reorder
                  </Button>
                </div>
              </div>
            </div>
            {trackingInfo[order.id] && (
              <div className="mt-4 p-4 border-t text-gray-700 bg-gray-100 rounded-lg">
                <p>{order.tracking}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
