"use client";

import * as React from "react";
import {
  IconBasketCheck,
  IconBook,
  IconCamera,
  IconCertificate,
  IconCoins,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconSettings,
  IconTrophy,
  IconUsersGroup,
} from "@tabler/icons-react";

import { NavMain } from "@/components/sidebar/nav-main";
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

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Kursus Saya",
      url: "/dashboard/my-course",
      icon: IconBook,
    },
    {
      title: "Sertifikat",
      url: "/dashboard/my-certificate",
      icon: IconCertificate,
    },
    {
      title: "Poin & Referral",
      url: "/dashboard/my-points",
      icon: IconCoins,
    },
    {
      title: "Achievement Badges",
      url: "/dashboard/my-badges",
      icon: IconTrophy,
    },
    {
      title: "Forum Komunitas",
      url: "/dashboard/forum-community",
      icon: IconUsersGroup,
    },
    {
      title: "Riwayat Pembelian",
      url: "/dashboard/history-payment",
      icon: IconBasketCheck,
    },
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
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/get-help",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard">
                <Image src={Logo} alt="Logo" className="size-5" />
                <span className="text-base text-primary font-semibold">
                  Selearn.
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
