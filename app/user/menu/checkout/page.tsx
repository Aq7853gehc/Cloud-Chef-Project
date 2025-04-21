"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getLatestOrders } from "@/app/actions/order.action";
import { useSession } from "next-auth/react";
import { IOrder } from "@/models/order.models";

export default function PlaceOrder() {
  const { data: session } = useSession();
  // const router = useRouter();
  
  const [data, setData] = useState<IOrder>();
  useEffect(() => {
    if (
      !session?.user._id ||
      !session.user.address ||
      !session.user.phone ||
      !session.user.email
    ) {
      redirect("/login");
    }
  }, [session]);

  const [userDetails] = useState({
    email: session?.user.email || "",
    address: session?.user.address || "",
    phone: session?.user.phone || "",
  });

  const fetchData = async () => {
    if (!session?.user._id) return;

    try {
      const result = await getLatestOrders(session.user._id);
      if (!result) throw new Error("Result not found");
      setData(result.data[0]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user._id]);

  const placeOrder = () => {
    alert("Order placed successfully!");
    redirect("/user/menu/thank-you");
  };

  return (
    <div className="container text-gray-900 flex flex-col items-center px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-6 text-gray-900"
      >
        Place Your Order
      </motion.h2>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-xl p-6 mb-6 w-full max-w-3xl"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Order Summary
        </h3>
        <div className="space-y-4">
          {/* {data?.items.map((item) => (
            <div
              key={item?.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex-1 pl-3">
                <h4 className="text-gray-900 font-medium">{item?.title}</h4>
                <p className="text-gray-500 text-sm">
                  ${item?.price.toFixed(2)}
                </p>
              </div>
             
            </div>
          ))} */}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-medium text-gray-900">Total:</span>
          <span className="text-xl font-bold text-gray-900">${data?.totalAmount}</span>
        </div>
      </motion.div>

      {/* User Details Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Delivery Details
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            readOnly
            value={userDetails.email}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="address"
            readOnly
            value={userDetails.address}
            placeholder="Delivery Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="phone"
            readOnly
            value={userDetails.phone}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </motion.div>

      {/* Place Order Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 w-full max-w-3xl"
      >
        <Button
          className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-400"
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </motion.div>
    </div>
  );
}
