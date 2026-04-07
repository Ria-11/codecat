"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Github, BookOpen, Settings, Moon, Sun, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import Logout from "@/module/auth/components/logout";

export const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationItems = [
    { title: "Dashboard", url: "/dashboard", icon: BookOpen },
    { title: "Repository", url: "/dashboard/repository", icon: Github },
    { title: "Reviews", url: "/dashboard/reviews", icon: BookOpen },
    { title: "Subscription", url: "/dashboard/subscription", icon: BookOpen },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url);
  };

  if (!mounted || !session) return null;

  const user = session.user;
  const userName = user.name || "GUEST";
  const userEmail = user.email || "";

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader className="border-b">
        <div className="flex flex-col gap-4 px-2 py-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
            <Github className="w-6 h-6" />
          </div>

          <div>
            <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">
              Connected Account
            </p>
            <p className="text-sm font-medium text-sidebar-foreground/90">
              @{userName}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-3 py-6 flex flex-col gap-2">
        <div>
          <p className="text-[10px] font-semibold text-sidebar-foreground/60 px-3 mb-2 uppercase tracking-widest">
            Menu
          </p>
        </div>

        <SidebarMenu className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);

            return (
              <SidebarMenuItem key={item.url}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      
      <SidebarFooter className="border-t p-3">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer hover:bg-muted">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-sm leading-tight">
          <span className="font-medium">{userName}</span>
          <span className="text-xs text-muted-foreground">
            {userEmail}
          </span>
        </div>
      </div>
    </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-56">
  
  {/* USER INFO */}
  <div className="flex items-center gap-3 px-2 py-2">
    <Avatar className="w-8 h-8">
      <AvatarImage src={user.image || ""} />
      <AvatarFallback>{userInitials}</AvatarFallback>
    </Avatar>

    <div className="flex flex-col text-sm leading-tight">
      <span className="font-medium">{userName}</span>
      <span className="text-xs text-muted-foreground">
        {userEmail}
      </span>
    </div>
  </div>

  {/* THEME */}
  <DropdownMenuItem
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  >
    Toggle Theme
  </DropdownMenuItem>

  {/* LOGOUT */}
  <DropdownMenuItem asChild>
    <Logout />
  </DropdownMenuItem>

</DropdownMenuContent>    
  </DropdownMenu>
</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;