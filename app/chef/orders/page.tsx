"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle,  Utensils, Flame, Leaf } from "lucide-react";
import { getAllOrder,  } from "@/app/actions/order.action";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { OrderI } from "@/types/type";



const ChefOrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrder();
      if (!response.success) throw new Error("Failed to fetch orders");
      setOrders(response.data || []);
    } catch (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleStatusUpdate = async (orderId: string, newStatus: 'pending' | 'completed' | 'canceled') => {
  //   try {
  //     const response = await updateOrderStatus(orderId, newStatus);
  //     if (!response.success) throw new Error("Status update failed");
      
  //     setOrders(prev => prev.map(order => 
  //       order._id === orderId ? { ...order, status: newStatus } : order
  //     ));
  //     toast.success(`Order marked as ${newStatus}`);
  //   } catch (error) {
  //     toast.error("Failed to update status");
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Utensils className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900">Kitchen Orders</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders
          .map((order) => (
            <Card 
              key={order._id as string}
              className="relative overflow-hidden border-l-4 shadow-sm transition-all"
              data-status={order.status}
            >
              <div className="absolute top-0 right-0 p-2 text-xs font-medium">
                <span className={`px-2 py-1 rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'canceled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">
                    Order #{`${order._id.slice(-4)}`}
                  </CardTitle>
                  <span className="text-sm text-gray-500">
                    {/* {format(new Date(order.createdAt), 'HH:mm a')} */}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Customer ID:</span>
                    <span className="text-sm text-gray-700">
                      {order.user.slice(-6)}
                    </span>
                  </div>

                  <div className="border-t pt-2">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Order Details:</h4>
                    <ul className="space-y-3">
                      {order.items.map((item, index) => (
                        <li 
                          key={index}
                          className="text-sm text-gray-700"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {item.type === 'Non-Veg' ? (
                                  <Flame className="w-4 h-4 text-red-600" />
                                ) : (
                                  <Leaf className="w-4 h-4 text-green-600" />
                                )}
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.discription}
                              </div>
                            </div>
                            <span className="font-medium">₹{item.price}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-gray-100 rounded-full">
                              {item.category}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-sm font-medium">Total:</span>
                    <span className="text-lg font-bold text-primary">
                      ₹{(order.totalAmount - 2.99).toFixed(2)}
                    </span>
                  </div>

                  {order.status === 'pending' && (
                    <div className="pt-4 flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleStatusUpdate(order._id, 'canceled')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        // onClick={() => handleStatusUpdate(order._id, 'completed')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

        {orders.filter(order => order.status === 'pending').length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 mb-4">No pending orders</div>
            <Utensils className="w-12 h-12 mx-auto text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefOrderManagement;