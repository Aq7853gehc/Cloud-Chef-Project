"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Star,
  Heart,
  Truck,
  User,
  Clock,
  Utensils,
  ChevronRight,
  Smile,
  Repeat,
  LogOut,
  Settings,
  Calendar,
  Package,
  History,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getChefs, getTotalChef, getuser } from "@/app/actions/user.action";
import { redirect, useRouter } from "next/navigation";
import { IUser, OrderI } from "@/types/type";
import { getOrderDetail, getTotalOrder } from "@/app/actions/order.action";
import { Skeleton } from "@/components/ui/skeleton";

const reviews = [
  {
    chef: "Chef Mario",
    rating: 5,
    comment: "Absolutely fantastic carbonara! Best I've ever had.",
    date: "Feb 16",
  },
];

export default function CustomerDashboard() {
  const [userData, setUserData] = useState<IUser>();
  const { data: session } = useSession();
  const [total, setTotal] = useState<number>(0);
  const [totalChef, setTotalChef] = useState<number>(0);
  const [favoriteChef, setFavoriteChef] = useState<IUser[]>([]);
  const [order, setOrder] = useState<OrderI[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const fetchUserData = async () => {
    try {
      if (session?.user.role !== "customer") {
        router.replace("/chef/dashboard");
        return;
      }
      if (!session?.user?.email) {
        throw new Error("No email found in session");
      }
      const result = await getuser(session?.user.email);
      if (!result.success) {
        throw new Error("Result not get");
      }
      setUserData(result.data[0]);
    } catch (error) {
      console.error("No result", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchUserData(),
        chefNo(),
        totalOrder(),
        getFavoriteChef(),
        getOrder(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.user?.email) {
      redirect("/login");
    }
    fetchData();
  }, [session?.user.email]);

  const totalOrder = async () => {
    if (!session?.user._id) return;
    const result = await getTotalOrder(session?.user._id);
    if (result.success) {
      setTotal(result.data || 0);
    }
  };

  const chefNo = async () => {
    const result = await getTotalChef();
    if (result.success) {
      setTotalChef(result.data || 0);
    }
  };

  const getFavoriteChef = async () => {
    const result = await getChefs();
    if (result.success) {
      setFavoriteChef(result.data);
    }
  };

  const getOrder = async () => {
    if (!session?.user._id) return;
    const result = await getOrderDetail(session?.user._id);
    console.log(result.data);
    if (result.success) {
      setOrder(result.data || []);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-green-50 w-full">
      {/* Modern Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Utensils className="h-6 w-6 text-primary" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                Cloud Chef
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SidebarTrigger />

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-primary font-medium">
                      {userData?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">
                    {userData?.name || "User"}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userData?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-8 bg-gradient-to-r from-primary to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {userData?.name?.split(" ")[0] || "Food Lover"}!
              </h2>
              <p className="opacity-90">
                What delicious meal will you order today?
              </p>
            </div>
            <Button variant="secondary" className="mt-4 md:mt-0">
              <Link href="/user/menu">Order Now</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Card className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-12" /> : total}
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-pink-100 text-pink-600 mr-4">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Favorite Chefs</p>
                <h3 className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-12" /> : totalChef}
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Loyalty Points</p>
                <h3 className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-12" /> : "1,450"}
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-transparent gap-2 p-0">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-lg"
            >
              <ShoppingBag className="h-4 w-4 mr-2" /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-lg"
            >
              <Heart className="h-4 w-4 mr-2" /> Favorites
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-lg"
            >
              <Star className="h-4 w-4 mr-2" /> Reviews
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-8">
            {/* Active Orders */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-primary" /> Active Orders
                </h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>

              {loading ? (
                <div className="grid gap-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="p-6">
                      <Skeleton className="h-6 w-1/3 mb-4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3 mt-2" />
                    </Card>
                  ))}
                </div>
              ) : order?.filter((order) => order.status === "pending").length >
                0 ? (
                <div className="grid gap-4">
                  {order
                    .filter((order) => order.status === "pending")
                    .map((order, i) => (
                      <Card
                        key={i}
                        className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                              <Package className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold">
                                Order #{order._id || "N/A"}
                              </h4>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString() || "Date not available"}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge
                              className={`${getStatusColor(
                                order.status
                              )} px-3 py-1 rounded-full`}
                            >
                              {order.status}
                            </Badge>
                            <div className="mt-2 flex items-center gap-2">
                              <p className="text-sm text-gray-500">
                                <ShoppingCart className="inline h-4 w-4 mr-1" />
                                {order.items.length} items
                              </p>
                              <p className="text-sm font-medium">
                                ₹{order.totalAmount?.toFixed(2) || "0.00"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-0 shadow-sm">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium">No Active Orders</h4>
                  <p className="text-muted-foreground mt-2">
                    Your active orders will appear here
                  </p>
                  <Button className="mt-4">Browse Chefs</Button>
                </Card>
              )}
            </div>

            {/* Past Orders */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <History className="h-5 w-5 mr-2 text-gray-600" /> Past Orders
                </h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>

              {loading ? (
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6">
                      <Skeleton className="h-6 w-1/3 mb-4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3 mt-2" />
                    </Card>
                  ))}
                </div>
              ) : order?.length > 0 ? (
                <div className="grid gap-4">
                  {order.slice(-3).map((order, i) => (
                    <Card
                      key={i}
                      className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Order #{order._id || "N/A"}
                            </h4>
                            <div className="flex flex-wrap items-center mt-1 gap-2">
                              <div className="text-sm text-gray-500 flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString() || "Date not available"}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {order.items.length} items
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                ₹{order.totalAmount?.toFixed(2) || "0.00"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${getStatusColor(
                              order.status
                            )} px-3 py-1 rounded-full`}
                          >
                            {order.status}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Repeat className="h-4 w-4 mr-2" /> Reorder
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-0 shadow-sm">
                  <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium">No Order History</h4>
                  <p className="text-muted-foreground mt-2">
                    Your past orders will appear here
                  </p>
                  <Button className="mt-4">Browse Chefs</Button>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <Heart className="h-5 w-5 mr-2 text-pink-600" /> Favorite Chefs
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-6">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[80px]" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : favoriteChef?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteChef.map((chef, i) => (
                  <Card
                    key={i}
                    className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="h-14 w-14">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {chef.name[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{chef.name}</h4>
                          <p className="text-sm text-gray-500">
                            {chef.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {chef.exp} years experience
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {chef.bio}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">4.8</span>
                          <span className="text-xs text-gray-500 ml-1">
                            (24 reviews)
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Menu
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center border-0 shadow-sm">
                <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium">No Favorite Chefs</h4>
                <p className="text-muted-foreground mt-2">
                  Chefs you favorite will appear here
                </p>
                <Button className="mt-4">Discover Chefs</Button>
              </Card>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-amber-600" /> Your
                Reviews
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </div>

            {reviews.length > 0 ? (
              <div className="grid gap-4">
                {reviews.map((review, i) => (
                  <Card
                    key={i}
                    className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                        <p className="text-gray-700">{review.comment}</p>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
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
              <Card className="p-8 text-center border-0 shadow-sm">
                <Smile className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium">No Reviews Yet</h4>
                <p className="text-muted-foreground mt-2">
                  Your reviews will appear here once you submit them
                </p>
                <Button className="mt-4">Leave a Review</Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
