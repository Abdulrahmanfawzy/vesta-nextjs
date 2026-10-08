import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { TabsLabel } from "../constants/Constants";
import Link from "next/link";

export default function ReturnsTabs() {
  return (
    <Tabs defaultValue="return-requests" className="w-full">
      <div className="flex items-center justify-between gap-4 container mx-auto">
        <TabsList className="h-auto gap-8 rounded-none bg-transparent p-0">
          {TabsLabel.map((tab) => (
            <Link
              href={`/returns${tab.value === "return" ? "" : `/${tab.value}`}`}
              key={tab.value}
            >
              <TabsTrigger
                value={tab.value}
                className="rounded-none ] border-0 bg-transparent px-0 py-2 text-[20px] font-semibold text-muted-foreground shadow-none
                         hover:text-foreground
                         data-[state=active]:bg-transparent
                          data-[state=active]:font-semibold data-[state=active]:text-[#1e3a5f] data-[state=active]:shadow-none
                         dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
