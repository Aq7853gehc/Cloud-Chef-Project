"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getLatestOrders } from "@/app/actions/order.action";
import { useSession } from "next-auth/react";
import { CartItem } from "@/app/user/menu/page";
import { IOrder } from "@/models/order.models";

export default function PlaceOrder() {
  const router = useRouter();
  const [cart] = useState<CartItem[]>();
  const [data,setData] = useState<IOrder>()
  const [userDetails, setUserDetails] = useState({
    email: "",
    address: "",
    phone: "",
  });
  const { data: session } = useSession();
  const fetch = async () => {
    if(!session?.user._id)throw new Error("User id not found")
    const result = await getLatestOrders(session.user._id);
    if (!result) throw new Error("Result not found");
    setData(result.data)
    console.log(result.data)
  };

  useEffect(() => {
    fetch();
  });

  const cartTotal = cart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (
      !session?.user._id ||
      !session.user.address ||
      !session.user.phone ||
      !session.user.email
    )
      throw new Error("Session not found");
    setUserDetails({
      email: session.user.email,
      address: session.user.address,
      phone: session.user.phone,
    });

    alert("Order placed successfully!");
    router.push("/thank-you");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center px-6 py-12">
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
           {`${data}`}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-medium text-gray-900">Total:</span>
          <span className="text-xl font-bold text-gray-900">
            ${cartTotal}
          </span>
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
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="Delivery Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
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