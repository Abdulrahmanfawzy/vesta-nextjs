import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardSidebarInMobile from "./DashboardSidebarInMobile";
interface DashboardHeaderProps {
  pageName: string;
  icon?: React.ReactNode;
  className?: string;
}
export default function DashboardHeader({ pageName, icon, className }: DashboardHeaderProps) {
  return (
    <header className={`flex h-20 w-full items-center border-b border-app-neutral-light justify-between mb-6 bg-white `}>
      {/* Left */}
      <div className="flex items-center">
        <div className="md:hidden ">
          <DashboardSidebarInMobile />
        </div>
        {icon && <div className="mr-2">{icon}</div>}
        <h1 className={cn("text-4xl  font-semibold  text-app-primary capitalize", className)}>
          {pageName}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-50"
        >
          <Bell size={17} strokeWidth={1.7} />
        </button>

        {/* Avatar */}
        <div className="flex size-9 items-center justify-center rounded-full bg-[#19203D] text-sm font-medium text-white">
          M
        </div>
      </div>
    </header>
  );
}
