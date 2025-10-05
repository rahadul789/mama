"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dock,
  Goal,
  Handshake,
  Home,
  IdCardLanyard,
  LucidePanelBottom,
  MailsIcon,
  Navigation,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Navbar",
    url: "/navbar",
    icon: Navigation,
  },
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Vision",
    url: "/vision",
    icon: Goal,
  },
  {
    title: "Services",
    url: "/services",
    icon: Dock,
  },
  {
    title: "Career",
    url: "/career",
    icon: IdCardLanyard,
  },
  {
    title: "Partner",
    url: "/partner",
    icon: Handshake,
  },
  {
    title: "Mails",
    url: "/mails",
    icon: MailsIcon,
  },
  {
    title: "Footer",
    url: "/footer",
    icon: LucidePanelBottom,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function SidebarLink() {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`${
              pathname === `/dashboard${item.url}` && "bg-accent"
            } `}
          >
            <Link className="  py-5" href={`/dashboard${item.url}`}>
              <item.icon />
              <span className=" pb-1">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
