"use client";

import { useState } from "react";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";
import ReturnRefundSettings from "./ReturnRefundSettings";
import SettingSidebar, { type SettingSection } from "./SettingSidebar";

const SettingTab = () => {
  const [selectedSetting, setSelectedSetting] = useState<SettingSection>("profile");

  return (
    
    <div className="flex w-full min-w-0 gap-8">
      <SettingSidebar
        selectedSetting={selectedSetting}
        onSettingChange={setSelectedSetting}
      />

      <div className="min-w-0 flex-1">
        <ProfileSettings isActive={selectedSetting === "profile"} />
        {selectedSetting === "notification" && <NotificationSettings />}
        {selectedSetting === "return_refund" && <ReturnRefundSettings />}
      </div>
    </div>
  );
};

export default SettingTab;
