"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, CreditCard } from "lucide-react";

export default function SubscriptionInfoPage() {
  const [subscription] = useState({
    plan: "Premium",
    price: 19.99,
    expiry: "March 15, 2025",
    status: "Active",
  });

  const billingHistory = [
    { id: 1, date: "Feb 15, 2024", amount: "$19.99", status: "Paid" },
    { id: 2, date: "Jan 15, 2024", amount: "$19.99", status: "Paid" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-3xl font-bold mb-4">Subscription Details</h2>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Current Plan</h3>
          <p className="text-gray-700">Plan: {subscription.plan}</p>
          <p className="text-gray-700">Price: ${subscription.price}/month</p>
          <p className="text-gray-700">Expiry Date: {subscription.expiry}</p>
          <p className="text-gray-700 flex items-center">
            Status: <CheckCircle className="w-4 h-4 text-green-500 ml-2" /> {subscription.status}
          </p>
        </div>
        <Button className="w-full bg-blue-600 text-white mt-4 flex items-center justify-center">
          <RefreshCw className="w-5 h-5 mr-2" /> Renew Plan
        </Button>
      </div>
      
      <h3 className="text-2xl font-bold mt-6">Billing History</h3>
      <div className="bg-white shadow-md p-6 rounded-lg mt-3">
        <ul className="divide-y">
          {billingHistory.map((bill) => (
            <li key={bill.id} className="py-2 flex justify-between">
              <span>{bill.date}</span>
              <span>{bill.amount}</span>
              <span className="text-green-600">{bill.status}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <h3 className="text-2xl font-bold mt-6">Payment & Support</h3>
      <div className="bg-white shadow-md p-6 rounded-lg mt-3">
        <Button className="w-full bg-gray-900 text-white flex items-center justify-center">
          <CreditCard className="w-5 h-5 mr-2" /> Manage Payment Method
        </Button>
      </div>
    </div>
  );
}
