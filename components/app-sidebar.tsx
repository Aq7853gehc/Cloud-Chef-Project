
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut, LucideProps,  ChefHat,  } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

// Menu items type
type MenuItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  badge?: string; // Optional badge for notifications
};

export function AppSidebar({ items }: { items: MenuItem[] }) {
  return (
    <Sidebar className="bg-white shadow-lg border-r border-gray-100">
      <SidebarContent className="flex flex-col justify-between h-full">
        {/* Top Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Logo and Branding */}
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <ChefHat className="w-8 h-8" />
                ChefHub
              </h1>
            </div>

            {/* Menu Items */}
            <SidebarMenu className="p-4" >
              {items.map((item) => (
                <div
                  key={item.title}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <item.icon className="w-6 h-6 text-gray-700" />
                        <span className="text-lg font-medium text-gray-800">{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto bg-red-500 hover:bg-red-600">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer Section */}
        <SidebarFooter className="p-4 border-t border-gray-100">
          <div className="space-y-4">
           
            {/* Logout */}
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 p-3 rounded-lg hover:bg-gray-50 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-lg font-medium">Logout</span>
              </Button>
            </Link>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}