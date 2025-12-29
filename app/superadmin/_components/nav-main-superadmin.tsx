"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavMainSuperAdmin({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  "transition-colors",
                  item.isActive &&
                    "bg-[rgba(0,123,255,0.1)] text-[#007BFF]"
                )}
              >
                <Link href={item.url} className="flex items-center gap-2">
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "size-4",
                        item.isActive ? "text-[#007BFF]" : "text-muted-foreground"
                      )}
                    />
                  )}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
