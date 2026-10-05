import { Bell } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex w-full! items-center justify-between rounded-lg bg-white border border-app-neutral-light px-1 py-1">
      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Overview</h1>

        {/* <p className="text-lg font-medium text-orange-500">Hello John !</p> */}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-50"
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
