"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  BookOpen,
  Calendar,
  Plus,
  Utensils,
  LineChart,
  ChefHatIcon,
  Bell,
  Settings,
  LogOut,
  Pencil,
  Sparkles,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { signOut, useSession } from "next-auth/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { getTotalCustomer, getuser } from "@/app/actions/user.action";
import { IUser, MenuItem } from "@/types/type";
import { getMenuByUser } from "@/app/actions/menu.action";

// const upcomingEvents = [
//   {
//     name: "Private Dining Event",
//     date: "Apr 15",
//     guests: 12,
//     progress: 75,
//     type: "Dinner",
//   },
//   {
//     name: "Cooking Workshop",
//     date: "Apr 18",
//     guests: 8,
//     progress: 30,
//     type: "Workshop",
//   },
//   {
//     name: "Wine Pairing Dinner",
//     date: "Apr 20",
//     guests: 20,
//     progress: 45,
//     type: "Event",
//   },
// ];

export default function Dashboard() {
  const [recipes, setRecipe] = useState<MenuItem[]>([]);
  const [userData, setUserData] = useState<IUser>();
  const { data: session } = useSession();
  const [totalCustomer, setTotalCustomer] = useState<number>(0);
  const router = useRouter();
  if (!session) {
    redirect("/login");
  }

  const getRecipe = async () => {
    if (!session.user._id) throw new Error("Not found User");
    const resp = await getMenuByUser(session.user._id);
    if (!resp) throw new Error("Response not get chefDashboar");
    setRecipe(resp.data || []);
  };

  const fun = async () => {
    try {
      if (session.user.role !== "chef") {
        router.replace("/user/dashboard");
        return;
      }
      if (!session?.user?.email) {
        throw new Error("No email found in session");
      }
      const result = await getuser(session.user.email);
      if (!result.success) {
        throw new Error("Result not get");
      }
      const user = result.data;
      if (!user) {
        throw new Error("Nothing found");
      }
      setUserData(user[0]);
    } catch (error) {
      console.error("No result", error);
    }
  };

  const customerNo = async () => {
    const result = await getTotalCustomer();
    if (result.success) {
      setTotalCustomer(result.data || 0);
    }
  };

  useEffect(() => {
    fun();
    getRecipe();
    customerNo();
  }, [session?.user.email, router]);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Responsive Header */}
      <header className="bg-gradient-to-r from-primary to-green-600 text-white shadow-lg">
        <div className="flex h-16 md:h-20 items-center px-4 justify-between mx-auto">
          <div className="flex items-center space-x-2">
            <ChefHatIcon className="h-6 w-6 md:h-8 md:w-8" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              ChefHub
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="md:hidden" />
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="cursor-pointer  transition-all bg-green-900">
                  <AvatarFallback>{userData?.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2" align="end">
                <DropdownMenuLabel className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/chef-avatar.jpg" />
                    <AvatarFallback>{userData?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{userData?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {userData?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Notifications Section */}
                <DropdownMenuItem className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  <Badge variant="destructive" className="ml-auto">
                    3
                  </Badge>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Settings and Logout */}
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

      <div className="px-2 md:px-4 py-6 md:py-8 mx-auto max-w-7xl">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="max-w-[600px]">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back,{" "}
              <span className="text-yellow-500">Chef {userData?.name}!</span>
            </h2>
            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
              Your kitchen performance at a glance
            </p>
          </div>
          <Link href="/chef/menu" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Create New</span>
              <span className="md:hidden">New</span>
            </Button>
          </Link>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 md:mb-8">
          <Card className="p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="flex items-center space-x-2 md:space-x-4">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold">
                      {new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Current Time
                    </p>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2 md:mt-3 flex items-center">
                  <LineChart className="h-3 w-3 mr-1" /> Updated in real-time
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="flex items-center space-x-2 md:space-x-4">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold">
                      {totalCustomer}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Total Customers
                    </p>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2 md:mt-3 flex items-center">
                  <LineChart className="h-3 w-3 mr-1" /> Based on your recipes
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="flex items-center space-x-2 md:space-x-4">
                  <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold">
                      {recipes.length}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Total Recipes
                    </p>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2 md:mt-3 flex items-center">
                  <LineChart className="h-3 w-3 mr-1" /> Still There
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* Responsive Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
          <TabsList className="bg-transparent gap-2 md:gap-4 w-full overflow-x-auto">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:shadow-lg px-3 py-2 md:px-6 md:py-3 text-sm"
            >
              <LineChart className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Overview</span>
              <span className="md:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="recipes"
              className="data-[state=active]:shadow-lg px-3 py-2 md:px-6 md:py-3 text-sm"
            >
              <Utensils className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Recipes</span>
              <span className="md:hidden">Food</span>
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:shadow-lg px-3 py-2 md:px-6 md:py-3 text-sm"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Events
              <Badge>Coming soon</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Responsive Overview Tab */}
          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:gap-6 lg:grid-cols-7">
              <Card className="col-span-7 p-4 md:p-6 bg-white shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center">
                  <Utensils className="h-5 w-5 md:h-6 md:w-6 mr-2 text-primary" />
                  Your Recipes
                </h3>
                <ScrollArea className="h-[300px] md:h-[400px]">
                  <div className="space-y-2 md:space-y-4">
                    {recipes?.length > 0 ? (
                      recipes.map((recipe, i) => (
                        <div
                          key={i}
                          className="group flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
                            <div className="bg-primary/10 p-1 md:p-2 rounded-lg">
                              <Utensils className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                            </div>
                            <div className="flex flex-col">
                              <h4 className="font-semibold text-sm md:text-base">
                                {recipe.title}
                              </h4>
                              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                                {recipe.discription}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                <Badge
                                  variant={
                                    recipe.type === "Veg"
                                      ? "default"
                                      : "destructive"
                                  }
                                  className="text-xs w-fit"
                                >
                                  {recipe.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {recipe.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right w-full md:w-auto">
                            <div className="flex items-center justify-end gap-2">
                              <span className="font-medium text-sm md:text-base">
                                ₹{recipe.price}
                              </span>
                              <Link href={`/chef/menu`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm"
                                >
                                  Edit{" "}
                                  <Pencil className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center">
                        <p className="text-muted-foreground mt-2">
                          No recipes found. Create your first recipe to get
                          started.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </TabsContent>

          {/* Responsive Recipes Tab */}
          <TabsContent value="recipes">
            <Card className="p-4 md:p-6 bg-white shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold flex items-center">
                  <Utensils className="h-5 w-5 md:h-6 md:w-6 mr-2 text-primary" />
                  Recipe Management
                </h3>
                <Link href="/chef/menu" className="w-full md:w-auto">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-green-600">
                    <Plus className="h-4 w-4 mr-1" />
                    New Recipe
                  </Button>
                </Link>
              </div>

              <div className="grid gap-2 md:gap-4">
                {recipes.length > 0 ? (
                  recipes.map((recipe, i) => (
                    <div
                      key={i}
                      className="group flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
                        <div className="bg-primary/10 p-1 md:p-2 rounded-lg">
                          <Utensils className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-semibold text-sm md:text-base">
                            {recipe.title}
                          </h4>
                          <p className="text-xs md:text-sm text-muted-foreground mt-1">
                            {recipe.discription}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <Badge
                              variant={
                                recipe.type === "Veg"
                                  ? "default"
                                  : "destructive"
                              }
                              className="text-xs w-fit"
                            >
                              {recipe.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {recipe.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right w-full md:w-auto pr-2  ">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium text-sm md:text-base">
                            ₹{recipe.price}
                          </span>
                          {/* <Link href={`/chef/menu/${recipe._id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm"
                            >
                              Edit{" "}
                              <Pencil className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                            </Button>
                          </Link> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-muted-foreground mt-2">
                      No recipes found. Start by creating your first recipe.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Responsive Events Tab */}
          <TabsContent value="events">
            <Card className="p-4 md:p-6 bg-white shadow-sm relative overflow-hidden">
              Coming Soon Ribbon
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-8 -translate-y-2 shadow-md">
                COMING SOON
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold flex items-center">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 mr-2 text-purple-500" />
                  Event Management
                </h3>
                <Button
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-green-600 text-xs md:text-sm"
                  disabled
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Schedule Event
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6">
                  <Calendar className="h-16 w-16 text-purple-400 mx-auto" />
                  <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-400 animate-pulse" />
                </div>

                <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Exciting Feature Coming Soon!
                </h4>

                <p className="text-muted-foreground mb-4 max-w-md">
                  We&apos;re cooking up something special! The event management
                  system will help you organize private dining experiences,
                  cooking classes, and culinary events.
                </p>

                <div className="flex items-center text-sm text-purple-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Launching Summer 2025</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
