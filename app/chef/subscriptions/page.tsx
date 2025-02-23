"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const chefSubscriptionData = {
  plan: "Premium Plan",
  renewalDate: "2025-03-15",
  features: ["Unlimited Orders", "Priority Support", "Increased Visibility"],
};

const earningsData = {
  totalEarnings: 2500,
  recentTransactions: [
    { id: "TXN101", amount: 200, date: "2025-02-10" },
    { id: "TXN102", amount: 150, date: "2025-02-12" },
    { id: "TXN103", amount: 100, date: "2025-02-14" },
  ],
};

const ChefSubscriptionEarnings = () => {
  const [subscription] = useState(chefSubscriptionData);
  const [earnings] = useState(earningsData);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center ">Subscription & Earnings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Subscription Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 font-medium">Plan: {subscription.plan}</p>
            <p className="text-gray-600">Renewal Date: {subscription.renewalDate}</p>
            <ul className="mt-3 list-disc list-inside text-gray-700">
              {subscription.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 font-medium">Total Earnings: ${earnings.totalEarnings}</p>
            <p className="text-gray-600">Recent Transactions:</p>
            <ul className="mt-3 text-gray-700">
              {earnings.recentTransactions.map((txn) => (
                <li key={txn.id} className="border-b py-2">
                  {txn.date} - ${txn.amount}
                </li>
              ))}
            </ul>
            <Button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChefSubscriptionEarnings;
