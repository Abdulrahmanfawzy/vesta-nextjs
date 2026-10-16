import { cn } from "@/lib/utils";
import DashboardSidebarInMobile from "./DashboardSidebarInMobile";
import Link from "next/link";
import { getProfileApi } from "@/api/profile.api";
import Image from "next/image";
interface DashboardHeaderProps {
  pageName: string;
  icon?: React.ReactNode;
  className?: string;
}
export default async function DashboardHeader({
  pageName,
  icon,
  className,
}: DashboardHeaderProps) {
  const { data } = await getProfileApi();

  return (
    <header
      className={`flex h-20 w-full items-center border-b border-app-neutral-light justify-between mb-6 bg-white `}
    >
      {/* Left */}
      <div className="flex items-center">
        <div className="md:hidden ">
          <DashboardSidebarInMobile />
        </div>
        {icon && <div className="mr-2">{icon}</div>}
        <h1
          className={cn(
            "text-4xl  font-semibold  text-app-primary capitalize",
            className,
          )}
        >
          {pageName}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        {/* <button
          type="button"
          aria-label="Notifications"
          className="flex size-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-50"
        >
          <Bell size={17} strokeWidth={1.7} />
        </button> */}

        {/* Avatar */}

        <Link href={"/settings"}>
          <div className="flex cursor-pointer size-9 items-center justify-center rounded-full bg-[#19203D] text-sm font-medium text-white relative">
            {data?.user?.avatar_url ? (
              <Image
                className="object-cover rounded-full"
                src={data?.user?.avatar_url || ""}
                alt={data.user.name}
                fill
              />
            ) : (
              data?.user?.name?.slice(0, 2).toUpperCase()
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
