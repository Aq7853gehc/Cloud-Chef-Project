"use client";

import { JSX, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Truck,
  CheckCircle,
  Clock,
  Utensils,
  XCircle,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { IOrder } from "@/types/type";
import { deleteOrder, getOrderDetail } from "@/app/actions/order.action";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// ... (Keep StatusConfig, OrderItem, StatusIndicator, getOrderProgress interfaces and functions same as before)
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

const StatusIndicator = ({
  status,
}: {
  status: "pending" | "completed" | "canceled";
}) => {
  const statusConfig: Record<string, StatusConfig> = {
    completed: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    pending: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: <Clock className="w-4 h-4" />,
    },
    canceled: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      icon: <XCircle className="w-4 h-4" />,
    },
  };

  return (
    <Badge
      className={`gap-2 ${statusConfig[status].bgColor} ${statusConfig[status].textColor}`}
    >
      {statusConfig[status].icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const getOrderProgress = (status: "pending" | "completed" | "canceled") => {
  switch (status) {
    case "pending":
      return {
        timeline: [
          "Order Placed",
          "Preparing",
          "Out for Delivery",
          "Delivered",
        ],
        progress: 50,
        trackingMessage: "Your order is being processed.",
      };
    case "completed":
      return {
        timeline: [
          "Order Placed",
          "Preparing",
          "Out for Delivery",
          "Delivered",
        ],
        progress: 100,
        trackingMessage: "Your order has been delivered.",
      };
    case "canceled":
      return {
        timeline: ["Order Canceled"],
        progress: 0,
        trackingMessage: "Your order has been canceled.",
      };
    default:
      return {
        timeline: [],
        progress: 0,
        trackingMessage: "",
      };
  }
};

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div className="h-6 bg-gray-100 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-48 animate-pulse" />
            </div>
            <div className="h-8 bg-gray-100 rounded w-24 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
            {[1, 2].map((j) => (
              <div
                key={j}
                className="h-4 bg-gray-100 rounded w-64 animate-pulse"
              />
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-100 rounded w-32 animate-pulse" />
            <div className="h-10 bg-gray-100 rounded w-32 animate-pulse" />
          </div>
        </div>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 animate-shimmer" />
      </motion.div>
    ))}
  </div>
);

export default function OrdersPage() {
  const [trackingInfo, setTrackingInfo] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
const router = useRouter()
  const fetchOrders = async () => {
    try {
      if (!session?.user._id) {
        redirect("/login")
      };
      const response = await getOrderDetail(session.user._id);
      if (response.data) {
        console.log(response.data);
        setOrders(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
const {toast} = useToast();
  const deleteorder = async(orderid:string)=>{
    try {
      const response = await deleteOrder(orderid);
      if (response.success) {
        toast({
          title: response.message
        })
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    fetchOrders();
  }, [session?.user._id]);

  // ... Keep formatDate function same as before
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 flex items-center gap-2"
          >
            <Utensils className="w-8 h-8 text-primary" />
            Order History
          </motion.h1>
        </div>

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {orders?.map((order) => {
              const { timeline, progress, trackingMessage } = getOrderProgress(
                order.status,
              );

              return (
                <motion.div
                  key={order._id as string}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      {/* Order Info Section */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Order #{(order._id as string).slice(-6)}
                          </h3>
                          <StatusIndicator status={order.status} />
                        </div>
                        <p className="text-sm text-gray-500">
                          {/* {formatDate(order.createdAt.toString())} */}
                        </p>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Items:
                          </h4>
                          <ul className="space-y-2">
                            {(order.items as unknown as OrderItem[]).map(
                              (item) => (
                                <motion.li
                                  key={item._id as string}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <span className="font-medium">
                                    {item.title}
                                  </span>{" "}
                                  - ₹{item.price.toFixed(2)}
                                  <span className="text-xs ml-2 bg-gray-200 px-2 py-1 rounded-full">
                                    {item.type}
                                  </span>
                                </motion.li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Total and Actions Section */}
                      <div className="flex flex-col items-end gap-3">
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="text-right"
                        >
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{order.totalAmount.toFixed(2)}
                          </p>
                        </motion.div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              setTrackingInfo((prev) => ({
                                ...prev,
                                [order._id as string]:
                                  !prev[order._id as string],
                              }))
                            }
                            variant="outline"
                            className="gap-2 px-4 hover:bg-gray-50"
                            disabled={order.status === "canceled"}
                          >
                            <Truck className="w-5 h-5" />
                            {trackingInfo[order._id as string]
                              ? "Hide Tracking"
                              : "Track Order"}
                          </Button>
                          <Button
                            className="gap-2 px-4 bg-red-600 hover:bg-red-700 transition-transform hover:scale-105"
                            onClick={()=>deleteorder(order._id as string)}
                          >
                            <Trash className="w-5 h-5" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Tracking Section */}
                    <AnimatePresence>
                      {trackingInfo[order._id as string] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-4 border-t border-gray-100"
                        >
                          <div className="space-y-4">
                            <p className="text-gray-700 font-medium">
                              {trackingMessage}
                            </p>

                            {order.status !== "canceled" && (
                              <div className="relative pt-6">
                                <div className="absolute top-8 left-4 h-[2px] w-[calc(100%-2rem)] bg-gray-200 rounded-full">
                                  <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{
                                      duration: 0.8,
                                      type: "spring",
                                    }}
                                  />
                                </div>
                                <div className="flex justify-between">
                                  {timeline.map((step, index) => (
                                    <motion.div
                                      key={step}
                                      className="relative z-10"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <motion.div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center
                                          ${index * 33 <= progress ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}
                                          transition-colors duration-300`}
                                      >
                                        {index + 1}
                                      </motion.div>
                                      <p className="absolute top-10 left-0 w-24 text-sm text-gray-600 font-medium">
                                        {step}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Status Ribbon */}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!isLoading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mb-4 text-gray-400">
              <Utensils className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">Your order history will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
