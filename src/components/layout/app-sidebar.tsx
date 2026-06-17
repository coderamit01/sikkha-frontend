"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import Link from "next/link";
import { Role } from "@/types/user.types";
import { Route } from "@/types/rotute.type";
import SiteLogo from "@/assets/logo.png";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  const pathname = usePathname();

  let routes: Route[] = [];
  switch (user.role) {
    case Role.ADMIN:
      routes = adminRoutes;
      break;

    case Role.STUDENT:
      routes = studentRoutes;
      break;

    case Role.TUTOR:
      routes = tutorRoutes;
      break;

    default:
      routes = [];
      break;
  }

  const isActive = (url: string) => {
    return pathname === url;
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center border-b p-1">
       <img src={SiteLogo.src} alt="Logo" className="w-25" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link
                      href={item.url}
                      className={`${isActive(item.url) ? "bg-[#25a5a21c]! text-brand!  font-medium" : ""} h-10! ps-2!`}
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
