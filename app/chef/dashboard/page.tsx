"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChefHat,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Calendar,
  Star,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function Dashboard() {
  const recipes = [
    { name: "Razma Chaval", rating: 4.8, reviews: 156 },
    { name: "Coq au Vin", rating: 4.7, reviews: 98 },
    { name: "Risotto al Funghi", rating: 4.9, reviews: 203 },
  ];

  const upcomingEvents = [
    { name: "Private Dining Event", date: "Apr 15", guests: 12 },
    { name: "Cooking Workshop", date: "Apr 18", guests: 8 },
    { name: "Wine Pairing Dinner", date: "Apr 20", guests: 20 },
  ];

  return (
    <div className="min-h-screen bg-background w-full mx-auto">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <ChefHat className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold">ChefHub</h1>
        </div>
      </header>

      <div className="container px-4 py-6 mx-auto">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, Chef!</h2>
            <p className="text-muted-foreground">Here’s what’s cooking today!</p>
          </div>
          <Link href={"/chef/menu"}>
          <Button>
            <ChefHat className="mr-2 h-4 w-4" />
            New Recipe
          </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { icon: Clock, label: "Active Time", value: "6.5h" },
            { icon: Users, label: "Total Customers", value: "1,234" },
            { icon: TrendingUp, label: "Revenue", value: "$12.5k" },
            { icon: BookOpen, label: "Total Recipes", value: "86" },
          ].map((stat, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center space-x-4">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Popular Recipes */}
              <Card className="col-span-4">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Popular Recipes</h3>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4 mt-4">
                      {recipes.map((recipe, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{recipe.name}</h4>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-muted-foreground">
                                {recipe.rating} ({recipe.reviews} reviews)
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card className="col-span-3">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Upcoming Events</h3>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4 mt-4">
                      {upcomingEvents.map((event, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.name}</h4>
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              {event.date} • {event.guests} guests
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recipes">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Recipe Management</h3>
                <p className="text-muted-foreground">Manage and organize your recipes here.</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Event Calendar</h3>
                <p className="text-muted-foreground">View and manage your upcoming events.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
