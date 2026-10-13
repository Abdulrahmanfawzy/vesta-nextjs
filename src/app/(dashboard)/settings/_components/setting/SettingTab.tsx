"use client";

import { useState } from "react";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";
import ReturnRefundSettings from "./ReturnRefundSettings";
import SettingSidebar, { type SettingSection } from "./SettingSidebar";

import {
  useQuery,

} from '@tanstack/react-query'
import { getReturnPoliciesAction } from "@/actions/setting.actions";


const SettingTab = () => {
  const [selectedSetting, setSelectedSetting] = useState<SettingSection>("profile");
  const { data,isPending,isError,error} = useQuery({
    queryKey: ["return-policies"],
    queryFn: getReturnPoliciesAction,
    enabled: selectedSetting === "return_refund",
  });



  return (

    <div className="flex w-full min-w-0 gap-8">
      <SettingSidebar
        selectedSetting={selectedSetting}
        onSettingChange={setSelectedSetting}
      />

      <div className="min-w-0 flex-1">
      
       { selectedSetting === "profile" && <ProfileSettings />}
        {selectedSetting === "notification" && <NotificationSettings />}
        {selectedSetting === "return_refund" && (
          <>
            {isPending && (
              <p>Policies loading...</p>
            )}

            {isError && (
              <p className="text-red-500">
                {error.message}
              </p>
            )}

            {data && (
              <ReturnRefundSettings
                policies={data.data}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingTab;
