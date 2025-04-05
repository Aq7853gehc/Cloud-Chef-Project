"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Star,
  Heart,
  Truck,
  User,
  Bell,
  Clock,
  Utensils,
  ChevronRight,
  MapPin,
  Smile,
  Repeat,
  LogOut,
  Settings,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function CustomerDashboard() {
  const pastOrders = [
    {
      name: "Spaghetti Carbonara",
      chef: "Chef Mario",
      date: "Feb 15",
      status: "Delivered",
      rating: 5,
    },
    {
      name: "Chicken Biryani",
      chef: "Chef Ayesha",
      date: "Feb 10",
      status: "Delivered",
      rating: 4,
    },
  ];

  const activeOrders = [
    {
      name: "Sushi Platter",
      chef: "Chef Kenji",
      date: "Feb 22",
      status: "On the Way",
      progress: 75,
    },
  ];

  const favoriteChefs = [
    {
      name: "Chef Mario",
      rating: 4.9,
      reviews: 320,
      specialty: "Italian Cuisine",
      avatar: "/chef-mario.jpg",
    },
    {
      name: "Chef Ayesha",
      rating: 4.8,
      reviews: 275,
      specialty: "Indian Fusion",
      avatar: "/chef-ayesha.jpg",
    },
  ];

  const reviews = [
    {
      chef: "Chef Mario",
      rating: 5,
      comment: "Absolutely fantastic carbonara! Best I've ever had.",
      date: "Feb 16",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-primary to-green-600 text-white shadow-lg">
        <div className=" flex h-20 items-center px-4 justify-between">
          <div className="flex items-center space-x-2">
            <Utensils className="h-8 w-8" />
            <h1 className="text-2xl font-bold tracking-tight">Cloud Chef</h1>
          </div>
          <div className="flex items-center space-x-4">
            <SidebarTrigger />

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-white/20 transition-all">
                  <AvatarImage src="/customer-avatar.jpg" />
                  <AvatarFallback>CU</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2" align="end">
                {/* User Profile Section */}
                <DropdownMenuLabel className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/customer-avatar.jpg" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <div>
                    <p>Customer Name</p>
                    <p className="text-xs text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Notifications Section */}
                <DropdownMenuItem className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  <Badge variant="destructive" className="ml-auto">
                    2
                  </Badge>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Account Actions */}
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 text-red-500 focus:bg-red-50"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className=" px-4 py-8">
        {/* Welcome Section with Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
          </Card>
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Favorite Chefs</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </Card>
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Loyalty Points</p>
                <h3 className="text-2xl font-bold">1,450</h3>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-transparent gap-4">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:shadow-lg px-6 py-3"
            >
              <ShoppingBag className="h-4 w-4 mr-2" /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:shadow-lg px-6 py-3"
            >
              <Heart className="h-4 w-4 mr-2" /> Favorites
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:shadow-lg px-6 py-3"
            >
              <Star className="h-4 w-4 mr-2" /> Reviews
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Orders Tab */}
          <TabsContent value="orders" className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-green-600" /> Active Orders
              </h3>
              <div className="grid gap-4">
                {activeOrders.map((order, i) => (
                  <Card
                    key={i}
                    className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{order.name}</h4>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" /> {order.chef}
                          <Clock className="h-4 w-4 ml-4 mr-1" /> {order.date}
                        </div>
                        <Progress
                          value={order.progress}
                          className="mt-4 h-2 w-[300px]"
                        />
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="px-3 py-1">
                          <Truck className="h-4 w-4 mr-2" /> {order.status}
                        </Badge>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Estimated arrival: 7:30 PM
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <ShoppingBag className="h-6 w-6 mr-2 text-blue-600" /> Past
                Orders
              </h3>
              <div className="grid gap-4">
                {pastOrders.map((order, i) => (
                  <Card
                    key={i}
                    className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">{order.name}</h4>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" /> {order.chef}
                          <Clock className="h-4 w-4 ml-4 mr-1" /> {order.date}
                          <div className="ml-4 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < order.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Repeat className="h-4 w-4 mr-2" /> Reorder
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Favorites Tab */}
          <TabsContent value="favorites">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Heart className="h-6 w-6 mr-2 text-red-500" /> Favorite Chefs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteChefs.map((chef, i) => (
                <Card
                  key={i}
                  className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={chef.avatar} />
                        <AvatarFallback>{chef.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-semibold">{chef.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {chef.specialty}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm">
                            {chef.rating} ({chef.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Enhanced Reviews Tab */}
          <TabsContent value="reviews">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2 text-yellow-500" /> Your Reviews
            </h3>
            {reviews.length > 0 ? (
              <div className="grid gap-4">
                {reviews.map((review, i) => (
                  <Card key={i} className="p-6 border-0 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                        <div className="mt-4 flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-2" /> {review.chef}
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-2" /> {review.date}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center border-0 shadow-sm">
                <Smile className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium">No Reviews Yet</h4>
                <p className="text-muted-foreground mt-2">
                  Your reviews will appear here once you submit them
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
