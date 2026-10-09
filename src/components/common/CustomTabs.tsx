"use client";

import {Tabs,TabsContent,TabsList,TabsTrigger,} from "@/components/ui/tabs";
import { ReactNode } from "react";

interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface CustomTabsProps {
  tabs: TabItem[];
   value?: string;
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

const CustomTabs = ({tabs,value,defaultValue,className,onValueChange}: CustomTabsProps) => {
  return (
    <Tabs
    value={value}
      defaultValue={defaultValue ?? tabs[0]?.value}
       onValueChange={onValueChange}
      className={`w-full min-w-0 ${className ?? ""}`}
    >
      <TabsList className="flex h-auto w-full justify-start! gap-8 rounded-none border-0 bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="
              rounded-none
              max-w-fit
              border-0
              bg-transparent
              px-0
              pb-3
              text-[20px]
              font-normal
              text-[#5E6061]
              shadow-none

              hover:text-gray-500
              data-[state=active]:border-b-2
              data-[state=active]:font-semibold
              data-[state=active]:border-b-[#161C36]
              data-[state=active]:bg-transparent!
              data-[state=active]:text-[#161C36]
              data-[state=active]:shadow-none!
            "
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList> 

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-6 w-full min-w-0"
        >
          {tab.content}
        </TabsContent>
      ))} 
    </Tabs>
  );
};

export default CustomTabs;