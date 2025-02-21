"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  item: string;
  status: string;
}

const ordersData: Order[] = [
  { id: "101", customer: "Alice Johnson", item: "Grilled Salmon", status: "Pending" },
  { id: "102", customer: "Michael Smith", item: "Pasta Carbonara", status: "In Progress" },
  { id: "103", customer: "Emma Brown", item: "Caesar Salad", status: "Completed" },
];

const ChefOrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(ordersData);

  const updateOrderStatus = (id: string, status: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 text-center">Order Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 font-medium">Customer: {order.customer}</p>
              <p className="text-gray-600">Item: {order.item}</p>
              <p className={`mt-2 text-sm ${order.status === "Completed" ? "text-green-600" : order.status === "In Progress" ? "text-blue-600" : order.status === "Cancelled" ? "text-red-600" : "text-yellow-600"}`}>
                Status: {order.status}
              </p>
              {order.status !== "Completed" && order.status !== "Cancelled" && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Button
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 text-sm flex items-center"
                    onClick={() => updateOrderStatus(order.id, "Completed")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Complete
                  </Button>
                  {order.status === "Pending" && (
                    <Button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 text-sm flex items-center"
                      onClick={() => updateOrderStatus(order.id, "In Progress")}
                    >
                      <Clock className="w-4 h-4 mr-2" /> In Progress
                    </Button>
                  )}
                  <Button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 text-sm flex items-center"
                    onClick={() => updateOrderStatus(order.id, "Cancelled")}
                  >
                    <XCircle className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChefOrderManagement;
