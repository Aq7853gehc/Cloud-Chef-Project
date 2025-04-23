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
import { LucideProps, ChefHat } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import LogoutButton from "./LogoutButton";
import { cn } from "@/lib/utils";

type MenuItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  badge?: string;
  isActive?: boolean;
};

export function AppSidebar({ items }: { items: MenuItem[] }) {
  return (
    <Sidebar className="bg-white border-r border-gray-200 w-64 transition-all duration-300 shadow-lg">
      <SidebarContent className="flex flex-col justify-between h-full">
        {/* Top Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Enhanced Logo Section */}
            <div className="p-6 border-b border-gray-200">
              <Link href="/" className="flex items-center gap-3 group">
                <ChefHat className="w-8 h-8 text-emerald-600 transition-transform group-hover:rotate-12" />
                <span className="text-2xl font-bold text-gray-800">
                  ChefHub
                </span>
              </Link>
            </div>

            {/* Modern Menu Items */}
            <SidebarMenu className="p-4 space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                        item.isActive 
                          ? "bg-emerald-50 text-emerald-700 shadow-sm"
                          : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-6 h-6 transition-colors",
                          item.isActive ? "text-emerald-600" : "text-gray-500"
                        )}
                      />
                      <span className="font-medium">
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge className="ml-auto bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-full px-2.5 py-1.5">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enhanced Footer */}
        <SidebarFooter className="p-4 border-t border-gray-200">
          <LogoutButton/>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}