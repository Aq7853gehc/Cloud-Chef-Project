import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Home, Utensils, Package, ClipboardList, DollarSign, Settings } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/chef/dashboard",
    icon: Home,
  },
  {
    title: "Menu Management",
    url: "/chef/menu",
    icon: Utensils,
  },
  {
    title: "Order Management",
    url: "/chef/orders",
    icon: Package,
  },
  {
    title: "Subscription & Earnings",
    url: "/chef/subscriptions",
    icon: DollarSign,
  },
  {
    title: "Reviews & Ratings",
    url: "/chef/review",
    icon: ClipboardList,
  },
  {
    title: "Profile & Settings",
    url: "/chef/profile",
    icon: Settings,
  },
];


const ChefLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
    <AppSidebar items={items}/>
    <main className='flex w-full h-full  gap-2'>
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
  )
}

export default ChefLayout
