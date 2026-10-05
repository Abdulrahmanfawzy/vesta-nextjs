"use client";
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartNoAxesColumn,
  LogOutIcon,
  RotateCcw,
  Settings,
  SquareChartGantt,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { label: "Overview", icon: SquareChartGantt, href: "/" },
  { label: "Analysis", icon: ChartNoAxesColumn, href: "/analysis" },
  { label: "Returns", icon: RotateCcw, href: "/returns" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="none"
      className="h-screen  w-31 bg-app-primary text-white"
    >
      {/* Logo */}
      <SidebarHeader className="items-center p-2.5">
        <div className="relative h-28 w-28">
          <Image
            loading="eager"
            src={Logo}
            alt="vesta logo"
            width={40}
            height={40}
            className="h-full w-full"
          />
        </div>
      </SidebarHeader>

      {/* Links */}
      <SidebarContent className="justify-center p-2.5">
        <SidebarMenu className="gap-8">
          {menuItems.map(({ href, icon: Icon, label }, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton
                asChild
                isActive={pathname === href}
                className="h-auto flex-col justify-center gap-2 p-0 text-base font-normal text-white
                  hover:bg-transparent hover:text-app-accent-peach
                  active:bg-transparent active:text-app-accent-peach
                  data-[active=true]:bg-transparent data-[active=true]:font-normal data-[active=true]:text-app-accent-peach
                  [&>svg]:size-5.75!"
              >
                <Link href={href}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Log out */}
      <SidebarFooter className="items-center  p-2.5 pb-6">
        <Button variant={"destructive"}>
          <LogOutIcon />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
