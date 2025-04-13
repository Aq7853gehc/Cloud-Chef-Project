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
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { IUser } from "@/models/user.models";
const recipes = [
  {
    name: "Razma Chaval",
    rating: 4.8,
    reviews: 156,
    status: "Published",
    cookTime: "45 min",
  },
  {
    name: "Coq au Vin",
    rating: 4.7,
    reviews: 98,
    status: "Draft",
    cookTime: "2.5 hrs",
  },
  {
    name: "Risotto al Funghi",
    rating: 4.9,
    reviews: 203,
    status: "Published",
    cookTime: "35 min",
  },
];

const upcomingEvents = [
  {
    name: "Private Dining Event",
    date: "Apr 15",
    guests: 12,
    progress: 75,
    type: "Dinner",
  },
  {
    name: "Cooking Workshop",
    date: "Apr 18",
    guests: 8,
    progress: 30,
    type: "Workshop",
  },
  {
    name: "Wine Pairing Dinner",
    date: "Apr 20",
    guests: 20,
    progress: 45,
    type: "Event",
  },
];

export default function Dashboard() {
  const [userData, setUserData] = useState<IUser>();
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    redirect("/login");
  }

  useEffect(() => {
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
        if(!user) {
          throw new Error("Nothing found")
        }
        setUserData(user[0]);
      } catch (error) {
        console.error("No result",error);
      }
    };
    fun();
  });

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-primary to-green-600 text-white shadow-lg">
        <div className="flex h-20 items-center px-4 justify-between mx-auto">
          <div className="flex items-center space-x-2">
            <ChefHatIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold tracking-tight">ChefHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
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

      <div className=" px-4 py-8 mx-auto">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back,
              <span className="text-yellow-500"> Chef {userData?.name}!</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Your kitchen performance at a glance
            </p>
          </div>
          <Link href="/chef/menu">
            <Button className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </Link>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
              value: "$12.5k",
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
              className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-3 flex items-center">
                    <LineChart className="h-3 w-3 mr-1" /> {stat.trend}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-primary    text-primary"
                >
                  View
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-transparent gap-4">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:shadow-lg px-6 py-3"
            >
              <LineChart className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="recipes"
              className="data-[state=active]:shadow-lg px-6 py-3"
            >
              <Utensils className="h-4 w-4 mr-2" /> Recipes
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:shadow-lg px-6 py-3"
            >
              <Calendar className="h-4 w-4 mr-2" /> Events
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {/* Popular Recipes */}
              <Card className="col-span-4 p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" /> Top
                  Performing Recipes
                </h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {recipes.map((recipe, i) => (
                      <div
                        key={i}
                        className="group flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Utensils className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{recipe.name}</h4>
                            <div className="flex items-center mt-1 space-x-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />{" "}
                                {recipe.cookTime}
                              </div>
                              <Badge
                                variant={
                                  recipe.status === "Published"
                                    ? "default"
                                    : "secondary"
                                }
                                className=""
                              >
                                {recipe.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{recipe.rating}</span>
                            <span className="text-muted-foreground ml-2">
                              ({recipe.reviews})
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            View Stats <LineChart className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>

              {/* Upcoming Events */}
              <Card className="col-span-3 p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-purple-500" /> Event
                  Schedule
                </h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {upcomingEvents.map((event, i) => (
                      <div
                        key={i}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{event.name}</h4>
                            <div className="flex items-center mt-2 space-x-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />{" "}
                                {event.date}
                              </div>
                              <Badge variant="outline">{event.type}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              {event.guests} Guests
                            </div>
                            <Progress
                              value={event.progress}
                              className="mt-2 w-24 h-2 "
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Preparation List
                          </Button>
                          <Button
                            size="sm"
                            className="w-full bg-green-500 hover:bg-green-600"
                          >
                            Manage Event
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </TabsContent>

          {/* Enhanced Recipes Tab */}
          <TabsContent value="recipes">
            <Card className="p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <Utensils className="h-6 w-6 mr-2 text-primary" /> Recipe
                  Management
                </h3>
                <div className="flex space-x-4">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" /> Manage Categories
                  </Button>
                  <Button className="bg-gradient-to-r from-primary to-green-600">
                    <Plus className="h-4 w-4 mr-2" /> New Recipe
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {recipes.length > 0 ? (
                  recipes.map((recipe, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Utensils className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{recipe.name}</h4>
                          <div className="flex items-center mt-1 space-x-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />{" "}
                              {recipe.cookTime}
                            </div>
                            <Badge
                              variant={
                                recipe.status === "Published"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {recipe.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          Analytics
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Archive
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
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

          {/* Enhanced Events Tab */}
          <TabsContent value="events">
            <Card className="p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-purple-500" /> Event
                  Management
                </h3>
                <Button className="bg-gradient-to-r from-primary to-green-600">
                  <Plus className="h-4 w-4 mr-2" /> Schedule Event
                </Button>
              </div>

              <div className="grid gap-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{event.name}</h4>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" /> {event.date}
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {event.guests} Guests
                          </div>
                          <Progress
                            value={event.progress}
                            className="mt-2 w-48 h-2"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Guest List
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Menu Planning
                        </Button>
                        <Button size="sm" className="w-full">
                          Manage Event
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
