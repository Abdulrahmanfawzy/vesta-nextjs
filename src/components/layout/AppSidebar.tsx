import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import Logo from "@/assets/images/logo.svg";
import {
  ChartNoAxesColumn,
  RotateCcw,
  Settings,
  SquareChartGantt,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const menuItems = [
  {
    label: "Overview",
    icon: SquareChartGantt,
    href: "/",
  },
  {
    label: "Analysis",
    icon: ChartNoAxesColumn,
    href: "/analysis",
  },
  {
    label: "Returns",
    icon: RotateCcw,
    href: "/returns",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

function AppSidebar() {
  return (
    <>
      <Sidebar side="left" className="*:bg-app-primary *:items-between w-35">
        <SidebarHeader className="w-30 h-30">
          <Image loading={"eager"} src={Logo} alt="Vesta Logo" />
        </SidebarHeader>

        <SidebarContent className="*:text-white gap-8">
          {menuItems.map(({ href, icon: Icon, label }, i) => {
            return (
              <Link href={href} key={i}>
                <div className="flex flex-col gap-2 justify-centers items-center">
                  <Icon />
                  <p>{label}</p>
                </div>
              </Link>
            );
          })}
        </SidebarContent>

        <SidebarFooter>
          <Button>Log Out</Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default AppSidebar;
