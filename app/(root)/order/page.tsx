"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export default function PlaceOrder() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!userDetails.name || !userDetails.address || !userDetails.phone) {
      alert("Please fill in all details");
      return;
    }

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    router.push("/thank-you");
  };

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Place Your Order
      </h2>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Order Summary
        </h3>
        <div className="space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-md"
                />
                <div className="flex-1 pl-3">
                  <h4 className="text-gray-900 font-medium">{item.name}</h4>
                  <p className="text-gray-500 text-sm">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <span className="text-lg font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in cart.</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-medium text-gray-900">Total:</span>
          <span className="text-xl font-bold text-gray-900">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* User Details Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Delivery Details
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="Delivery Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <input
            type="text"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-6">
        <Button
          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800"
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
