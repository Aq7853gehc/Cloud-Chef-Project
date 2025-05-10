"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Calendar,
  Star,
  Plus,
  AlertCircle,
  Utensils,
  LineChart,
  ChefHatIcon,
  Bell,
  Settings,
  LogOut,
  Pencil,
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
import { getuser } from "@/app/actions/user.action";
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
  useEffect(() => {
    fun();
    getRecipe();
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          {[
            {
              icon: Clock,
              label: "Active Time",
              value: "6.5h",
              trend: "+12% from last week",
            },
            {
              icon: Users,
              label: "Total Customers",
              value: "1,234",
              trend: "23 new this week",
            },
            {
              icon: TrendingUp,
              label: "Revenue",
              value: "₹12.5k",
              trend: "↑ 18% monthly growth",
            },
            {
              icon: BookOpen,
              label: "Total Recipes",
              value: "86",
              trend: "3 in draft",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold">
                        {stat.value}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 md:mt-3 flex items-center">
                    <LineChart className="h-3 w-3 mr-1" /> {stat.trend}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="hidden sm:inline-flex border-primary text-primary text-xs"
                >
                  View
                </Badge>
              </div>
            </Card>
          ))}
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
              <Badge>
                Coming soon
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Responsive Overview Tab */}
          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:gap-6 lg:grid-cols-7">
              <Card className="col-span-4 p-4 md:p-6 bg-white shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center">
                  <Star className="h-5 w-5 md:h-6 md:w-6 mr-2 text-yellow-500" />
                  Top Recipes
                </h3>
                <ScrollArea className="h-[300px] md:h-[400px]">
                  <div className="space-y-2 md:space-y-4">
                    {recipes?.map((recipe, i) => (
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm"
                            >
                              Edit{" "}
                              <Pencil className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>

              {/* <Card className="col-span-3 p-4 md:p-6 bg-white shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 mr-2 text-purple-500" />
                  Event Schedule
                </h3>
                <ScrollArea className="h-[300px] md:h-[400px]">
                  <div className="space-y-2 md:space-y-4">
                    {upcomingEvents.map((event, i) => (
                      <div
                        key={i}
                        className="p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="mb-2 md:mb-0">
                            <h4 className="font-semibold text-sm md:text-base">
                              {event.name}
                            </h4>
                            <div className="flex flex-col md:flex-row md:items-center mt-1 space-y-1 md:space-y-0 md:space-x-4">
                              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                {event.date}
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs w-fit"
                              >
                                {event.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm md:text-lg font-bold text-primary">
                              {event.guests} Guests
                            </div>
                            <Progress
                              value={event.progress}
                              className="mt-2 w-16 md:w-24 h-2"
                            />
                          </div>
                        </div>
                        <div className="mt-3 md:mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs md:text-sm"
                          >
                            Prep List
                          </Button>
                          <Button
                            size="sm"
                            className="w-full bg-green-500 hover:bg-green-600 text-xs md:text-sm"
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card> */}
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
                <div className="flex flex-col md:flex-row w-full md:w-auto gap-2">
                  <Button
                    variant="outline"
                    className="w-full md:w-auto text-xs md:text-sm"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Categories</span>
                  </Button>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-green-600 text-xs md:text-sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Recipe
                  </Button>
                </div>
              </div>

              <div className="grid gap-2 md:gap-4">
                {recipes.length > 0 ? (
                  recipes?.map((recipe, i) => (
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm"
                          >
                            Edit{" "}
                            <Pencil className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // ... (keep empty state same)
                  <div className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium">No Recipes Found</h4>
                    <p className="text-muted-foreground mt-2">
                      Start by creating your first recipe
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Responsive Events Tab */}
          {/* <TabsContent value="events">
            <Card className="p-4 md:p-6 bg-white shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold flex items-center">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 mr-2 text-purple-500" />
                  Event Management
                </h3>
                <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-green-600 text-xs md:text-sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Schedule Event
                </Button>
              </div>

              <div className="grid gap-2 md:gap-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, i) => (
                    <div
                      key={i}
                      className="p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-2 md:mb-0">
                          <h4 className="font-semibold text-sm md:text-base">
                            {event.name}
                          </h4>
                          <div className="flex flex-col md:flex-row md:items-center mt-1 space-y-1 md:space-y-0 md:space-x-4">
                            <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              {event.date}
                            </div>
                            <Badge variant="outline" className="text-xs w-fit">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm md:text-lg font-bold text-primary">
                            {event.guests} Guests
                          </div>
                          <Progress
                            value={event.progress}
                            className="mt-2 w-32 md:w-48 h-2"
                          />
                        </div>
                      </div>
                      <div className="mt-3 md:mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs md:text-sm"
                        >
                          Guests
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs md:text-sm"
                        >
                          Menu
                        </Button>
                        <Button size="sm" className="w-full text-xs md:text-sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  // ... (keep empty state same)
                  <div className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium">No Upcoming Events</h4>
                    <p className="text-muted-foreground mt-2">
                      Schedule your next culinary exp
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
