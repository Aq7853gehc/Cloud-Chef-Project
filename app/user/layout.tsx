import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  ChefHat,
  CreditCard,
  Home,
  Package,
  User,
  Utensils,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/user/dashboard",
    icon: Home,
  },

  {
    title: "Menu",
    url: "/user/menu",
    icon: Utensils,
  },
  {
    title: "Order",
    url: "/user/order",
    icon: Package,
  },

  {
    title: "Chefs",
    url: "/user/chefs",
    icon: ChefHat,
  },
  {
    title: "Chef Update",
    url: "/user/chef-update",
    icon: ChefHat,
  },
  {
    title: "Subscription Plan",
    url: "/user/subplane",
    icon: CreditCard,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: User,
  },
];


const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
    <AppSidebar items={items}/>
    <main className='flex w-full gap-2'>
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
  )
}

export default UserLayout
