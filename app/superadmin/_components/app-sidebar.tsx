"use client";

import * as React from "react";
import {
  IconCamera,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconSettings,
  IconUsersGroup,
  IconMail
} from "@tabler/icons-react";

import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo-selearn.svg";
import { usePathname } from "next/navigation";
import { NavMainSuperAdmin } from "./nav-main-superadmin";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/super-admin",
      icon: IconDashboard,
    },
    {
      title: "Instructors Request",
      url: "/instructors",
      icon: IconUsersGroup,
    },
    {
      title: "Send Email",
      url: "/superadmin/send-email-superadmin",
      icon: IconMail,
    }
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/admin/support",
      icon: IconHelp,
    },
  ],
};

export function AppSidebarSuperAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + "/"),
  }));

  const navSecondaryWithActive = data.navSecondary.map((item) => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + "/"),
  }));
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/">
                <Image src={Logo} alt="Logo" className="size-7" />
                <span className="text-base text-primary font-semibold">
                  Selearn.
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMainSuperAdmin items={navMainWithActive} />
        <NavSecondary items={navSecondaryWithActive} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
