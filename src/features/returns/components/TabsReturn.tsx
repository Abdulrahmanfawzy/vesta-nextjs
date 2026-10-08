"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsLabel } from "../constants/Constants";
import { Undo2, RotateCcw, ArrowLeftRight } from "lucide-react";

export default function TabReturn() {
  const pathname = usePathname();

  // Synchronize active tab based on current pathname
  const getActiveTab = () => {
    if (pathname.includes("exchange")) return "exchange-requests";
    if (pathname.includes("refund")) return "refunds";
    return "return";
  };

  const currentTab = getActiveTab();

  const getTabIcon = (value: string) => {
    switch (value) {
      case "return":
        return <Undo2 className="h-4 w-4 shrink-0" />;
      case "refunds":
        return <RotateCcw className="h-4 w-4 shrink-0" />;
      case "exchange-requests":
        return <ArrowLeftRight className="h-4 w-4 shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full border-b border-border/70 pb-0">
      <Tabs value={currentTab} className="w-full">
        <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
          <TabsList
            variant="line"
            className="flex h-auto w-max min-w-full items-center justify-start gap-1 sm:gap-4 md:gap-6 bg-transparent p-0"
          >
            {TabsLabel.map((tab) => {
              const href =
                tab.value === "return" ? "/returns" : `/returns/${tab.value}`;
              const isActive = currentTab === tab.value;

              return (
                <Link
                  href={href}
                  key={tab.value}
                  className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-lg"
                >
                  <TabsTrigger
                    value={tab.value}
                    className={`relative flex items-center gap-2 rounded-none border-b-2 bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200
                      ${
                        isActive
                          ? "border-primary text-primary font-bold shadow-none dark:text-white"
                          : "border-transparent text-muted-foreground hover:border-border/80 hover:text-foreground"
                      }
                    `}
                  >
                    {getTabIcon(tab.value)}
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </TabsTrigger>
                </Link>
              );
            })}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
