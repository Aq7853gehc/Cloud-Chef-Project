"use client";

import { JSX, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Truck, RefreshCcw, CheckCircle, Clock, Utensils, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { IOrder } from "@/models/order.models";
import { getOrderDetail } from "@/app/actions/order.action";
import { useSession } from "next-auth/react";

interface StatusConfig {
  bgColor: string;
  textColor: string;
  icon: JSX.Element;
}

interface OrderItem {
  _id: string;
  title: string;
  price: number;
  type: string;
  category: string;
  // Add other item properties as needed
}

const StatusIndicator = ({ status }: { status: 'pending' | 'completed' | 'canceled' }) => {
  const statusConfig: Record<string, StatusConfig> = {
    completed: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      icon: <CheckCircle className="w-4 h-4" />
    },
    pending: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      icon: <Clock className="w-4 h-4" />
    },
    canceled: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      icon: <XCircle className="w-4 h-4" />
    }
  };

  return (
    <Badge className={`gap-2 ${statusConfig[status].bgColor} ${statusConfig[status].textColor}`}>
      {statusConfig[status].icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const getOrderProgress = (status: 'pending' | 'completed' | 'canceled') => {
  switch (status) {
    case 'pending':
      return {
        timeline: ["Order Placed", "Preparing", "Out for Delivery", "Delivered"],
        progress: 50,
        trackingMessage: "Your order is being processed."
      };
    case 'completed':
      return {
        timeline: ["Order Placed", "Preparing", "Out for Delivery", "Delivered"],
        progress: 100,
        trackingMessage: "Your order has been delivered."
      };
    case 'canceled':
      return {
        timeline: ["Order Canceled"],
        progress: 0,
        trackingMessage: "Your order has been canceled."
      };
    default:
      return {
        timeline: [],
        progress: 0,
        trackingMessage: ""
      };
  }
};

export default function OrdersPage() {
  const [trackingInfo, setTrackingInfo] = useState<{ [key: string]: boolean }>({});
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { data: session } = useSession();

  const fetchOrders = async () => {
    if (!session?.user._id) return;
    const response = await getOrderDetail(session.user._id);
    if (!response.success) return console.log(response.error);
    if (response.data) setOrders(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [session?.user._id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-primary" />
            Order History
          </h1>
        </div>

        <div className="space-y-4">
          {orders?.map((order) => {
            const { timeline, progress, trackingMessage } = getOrderProgress(order.status);
            
            return (
              <motion.div
                key={order._id as string}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Order #{(order._id as string).slice(-6)}
                      </h3>
                      <div className="flex items-center gap-3">
                        <StatusIndicator status={order.status} />
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt as string)}
                        </p>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                        <ul className="mt-1 space-y-1">
                          {(order.items as unknown as OrderItem[]).map((item) => (
                            <>
                            <li key={item._id  as string} className="text-sm text-gray-600">
                              • {item.title} - ${item.price.toFixed(2)} ({item.type})
                            </li>
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-2xl font-bold text-primary">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setTrackingInfo(prev => ({
                            ...prev,
                            [order._id as string]: !prev[order._id as string]
                          }))}
                          variant="outline"
                          className="gap-2 px-4"
                          disabled={order.status === 'canceled'}
                        >
                          <Truck className="w-5 h-5" />
                          {trackingInfo[order._id as string] ? "Hide Tracking" : "Track Order"}
                        </Button>
                        <Button 
                          className="gap-2 px-4 bg-green-600 hover:bg-green-700"
                          disabled={order.status === 'canceled'}
                        >
                          <RefreshCcw className="w-5 h-5" />
                          Reorder
                        </Button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {trackingInfo[order._id as string] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-4 border-t border-gray-100"
                      >
                        <div className="space-y-4">
                          <p className="text-gray-700">{trackingMessage}</p>
                          
                          {order.status !== 'canceled' && (
                            <div className="relative pt-6">
                              <div className="absolute top-8 left-4 h-[2px] w-[calc(100%-2rem)] bg-gray-200">
                                <div
                                  className="h-full bg-primary transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <div className="flex justify-between">
                                {timeline.map((step, index) => (
                                  <div key={step} className="relative z-10">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                      ${index * 33 <= progress ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
                                    >
                                      {index + 1}
                                    </div>
                                    <p className="absolute top-10 left-0 w-24 text-sm text-gray-600">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          )}
        </div>
      </div>
    </div>
  );
}