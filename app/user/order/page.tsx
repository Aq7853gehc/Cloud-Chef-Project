"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Truck, RefreshCcw, CheckCircle, Clock, Utensils, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const orders = [
  {
    id: "101",
    item: "Margherita Pizza",
    price: 14.99,
    status: "Delivered",
    date: "2025-02-20",
    tracking: "Your order was delivered successfully.",
    progress: 100,
    timeline: ["Order Placed", "Preparing", "Out for Delivery", "Delivered"]
  },
  {
    id: "102",
    item: "Spaghetti Carbonara",
    price: 12.99,
    status: "Out for Delivery",
    date: "2025-02-21",
    tracking: "Your order is on the way! Expected delivery: 30 mins.",
    progress: 75,
    timeline: ["Order Placed", "Preparing", "Out for Delivery", "Delivered"]
  },
  {
    id: "103",
    item: "Sushi Platter",
    price: 18.99,
    status: "Processing",
    date: "2025-02-22",
    tracking: "Your order is being prepared.",
    progress: 25,
    timeline: ["Order Placed", "Preparing", "Out for Delivery", "Delivered"]
  }
];


interface StatusConfig {
  color: string;
  icon: JSX.Element;
}
const StatusIndicator = ({ status }: { status: string }) => {
  const statusConfig: Record<string, StatusConfig> = {
    Delivered: { color: "bg-green-500", icon: <CheckCircle className="w-4 h-4" /> },
    "Out for Delivery": { color: "bg-blue-500", icon: <Truck className="w-4 h-4" /> },
    Processing: { color: "bg-yellow-500", icon: <Clock className="w-4 h-4" /> }
  };

  return (
    <Badge className={`gap-2 ${statusConfig[status].color === 'bg-green-500' ? 'bg-green-100 text-green-800' : 
      statusConfig[status].color === 'bg-blue-500' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
      {statusConfig[status].icon}
      {status}
    </Badge>
  );
};

export default function OrdersPage() {
  const [trackingInfo, setTrackingInfo] = useState<{ [key: string]: boolean }>({});

  const toggleTracking = (orderId: string) => {
    setTrackingInfo((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-primary" />
            Order History
          </h1>
          <Button variant="outline" className="gap-2">
            Filter Orders
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">{order.item}</h3>
                    <div className="flex items-center gap-3">
                      <StatusIndicator status={order.status} />
                      <p className="text-sm text-gray-500">Order #${order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-2xl font-bold text-primary">
                      ${order.price.toFixed(2)}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => toggleTracking(order.id)}
                        variant="outline"
                        className="gap-2 px-4"
                      >
                        <Truck className="w-5 h-5" />
                        {trackingInfo[order.id] ? "Hide Tracking" : "Track Order"}
                      </Button>
                      <Button className="gap-2 px-4 bg-green-600 hover:bg-green-700">
                        <RefreshCcw className="w-5 h-5" />
                        Reorder
                      </Button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {trackingInfo[order.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-4 border-t border-gray-100"
                    >
                      <div className="space-y-4">
                        <p className="text-gray-700">{order.tracking}</p>
                        
                        <div className="relative pt-6">
                          <div className="absolute top-8 left-4 h-[2px] w-[calc(100%-2rem)] bg-gray-200">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between">
                            {order.timeline.map((step, index) => (
                              <div key={step} className="relative z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                  ${index * 33 <= order.progress ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
                                >
                                  {index + 1}
                                </div>
                                <p className="absolute top-10 left-0 w-24 text-sm text-gray-600">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}