"use client";

import { useEffect, useState } from "react";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";
import ReturnRefundSettings from "./ReturnRefundSettings";
import SettingSidebar, { type SettingSection } from "./SettingSidebar";
import { useGetReturnPolicy } from "@/hooks/useGetReturnPloicy";
import { toast } from "sonner";

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
            {isPending && <p>Policies loading...</p>}

            {data && <ReturnRefundSettings policies={data.data} />}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingTab;
