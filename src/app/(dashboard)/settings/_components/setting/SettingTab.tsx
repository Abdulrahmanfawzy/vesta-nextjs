"use client";

import { useEffect, useState } from "react";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";
import ReturnRefundSettings from "./ReturnRefundSettings";
import SettingSidebar, { type SettingSection } from "./SettingSidebar";
import { useGetReturnPolicy } from "@/hooks/useGetReturnPloicy";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ReturnRefundSettingsSkeleton = () => (
  <div
    className="flex w-full flex-col gap-2"
    role="status"
    aria-label="Loading return policies"
  >
    {Array.from({ length: 6 }, (_, index) => (
      <div
        key={index}
        className="flex items-center justify-between border-b border-[#D9D9D9] py-4"
      >
        <Skeleton className="h-4 w-48 max-w-[70%]" />
        <Skeleton className="size-9 rounded-md" />
      </div>
    ))}]
  </div>
);

const SettingTab = () => {
  const [selectedSetting, setSelectedSetting] =
    useState<SettingSection>("profile");
  const { data, isPending, isError, error } = useGetReturnPolicy();

  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load return policies.",
      );
    }
  }, [isError, error]);

  return (
    <div className="flex w-full min-w-0 gap-8">
      <SettingSidebar
        selectedSetting={selectedSetting}
        onSettingChange={setSelectedSetting}
      />

      <div className="min-w-0 flex-1">
        <ProfileSettings isActive={selectedSetting === "profile"} />
        {selectedSetting === "notification" && <NotificationSettings />}
        {selectedSetting === "return_refund" && (
          <>
            {isPending && (
              <ReturnRefundSettingsSkeleton />
            )}

            {data && <ReturnRefundSettings policies={data.data} />}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingTab;
