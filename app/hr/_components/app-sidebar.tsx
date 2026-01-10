"use client";

import { ClipboardCheck, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavMainSuperAdmin } from "./nav-main-hr";
import { NavUser } from "@/components/sidebar/nav-user";
import { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo-selearn.svg";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/hr",
      icon: Home,
    },
    {
      title: "Review Courses",
      url: "/hr/courses",
      icon: ClipboardCheck,
    },
  ],
};

export function AppSidebarHR({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMainWithActive = data.navMain.map((item) => ({
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
                  Selearn HR
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMainSuperAdmin items={navMainWithActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
