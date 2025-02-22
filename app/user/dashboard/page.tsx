"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Star, Heart, Truck, User } from "lucide-react";

export default function CustomerDashboard() {
  const pastOrders = [
    { name: "Spaghetti Carbonara", chef: "Chef Mario", date: "Feb 15", status: "Delivered" },
    { name: "Chicken Biryani", chef: "Chef Ayesha", date: "Feb 10", status: "Delivered" },
  ];

  const activeOrders = [
    { name: "Sushi Platter", chef: "Chef Kenji", date: "Feb 22", status: "On the Way" },
  ];

  const favoriteChefs = [
    { name: "Chef Mario", rating: 4.9, reviews: 320 },
    { name: "Chef Ayesha", rating: 4.8, reviews: 275 },
  ];

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <User className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold">Cloud Chef</h1>
        </div>
      </header>

      <div className="container px-4 py-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
            <p className="text-muted-foreground">Check your orders and favorite chefs</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <h3 className="text-lg font-medium">Active Orders</h3>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {activeOrders.map((order, i) => (
                  <Card key={i} className="p-4 flex justify-between items-center border rounded-lg">
                    <div>
                      <h4 className="font-medium">{order.name}</h4>
                      <p className="text-sm text-muted-foreground">{order.chef} • {order.date} • {order.status}</p>
                    </div>
                    <Truck className="h-6 w-6 text-primary" />
                  </Card>
                ))}
              </div>
            </ScrollArea>
            
            <h3 className="text-lg font-medium mt-6">Past Orders</h3>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {pastOrders.map((order, i) => (
                  <Card key={i} className="p-4 flex justify-between items-center border rounded-lg">
                    <div>
                      <h4 className="font-medium">{order.name}</h4>
                      <p className="text-sm text-muted-foreground">{order.chef} • {order.date} • {order.status}</p>
                    </div>
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <h3 className="text-lg font-medium mb-4">Favorite Chefs</h3>
            <ScrollArea className="h-[250px]">
              <div className="space-y-4">
                {favoriteChefs.map((chef, i) => (
                  <Card key={i} className="p-4 flex justify-between items-center border rounded-lg">
                    <div>
                      <h4 className="font-medium">{chef.name}</h4>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-muted-foreground">
                          {chef.rating} ({chef.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <Heart className="h-6 w-6 text-red-500" />
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <h3 className="text-lg font-medium mb-4">Your Reviews</h3>
            <p className="text-muted-foreground">Your reviews will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}