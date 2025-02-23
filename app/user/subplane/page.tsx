"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, CreditCard, DollarSignIcon } from "lucide-react";

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
      <h2 className="text-4xl font-bold mb-4 flex gap-2 items-center"><DollarSignIcon size={32}/> Subscription Details</h2>
          <h3 className="text-3xl font-bold  px-4 mt-8 mb-2">Current Plan</h3>
      <div className="bg-white shadow-md p-6 rounded-lg border ">
        <div className="mb-4">
          <p className="text-gray-700">Plan: {subscription.plan}</p>
          <p className="text-gray-700">Price: ${subscription.price}/month</p>
          <p className="text-gray-700">Expiry Date: {subscription.expiry}</p>
          <p className="text-gray-700 flex items-center">
            Status: <CheckCircle className="w-4 h-4 text-green-500 ml-2" /> {subscription.status}
          </p>
        </div>
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white mt-4 flex items-center justify-center">
          <RefreshCw className="w-5 h-5 mr-2" /> Renew Plan
        </Button>
      </div>
      
      <h3 className="text-3xl font-bold mt-6 px-4">Billing History</h3>
      <div className="bg-white shadow-md p-6 rounded-lg mt-3 border">
        <ul className="divide-y">
          {billingHistory.map((bill) => (
            <li key={bill.id} className="py-2 flex justify-between">
              <span>{bill.date}</span>
              <span>{bill.amount}</span>
              <span className="text-green-600 font-bold">{bill.status}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <h3 className="text-3xl font-bold mt-6 px-4">Payment & Support</h3>
      <div className="bg-white shadow-md p-6 rounded-lg mt-3 border">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center">
          <CreditCard className="w-5 h-5 mr-2" /> Manage Payment Method
        </Button>
      </div>
    </div>
  );
}
