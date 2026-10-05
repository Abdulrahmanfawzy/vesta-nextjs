import { Bell } from "lucide-react";
import DashboardSidebarInMobile from "./DashboardSidebarInMobile";

export default function DashboardHeader({ pageName }: { pageName: string }) {
  return (
    <header className="flex w-full items-center justify-between bg-white">
      {/* Left */}
      <div className="flex items-center">
        <div className="md:hidden ">
          <DashboardSidebarInMobile />
        </div>
        <h1 className="text-4xl  font-semibold text-app-primary capitalize">
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
