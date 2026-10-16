"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import CustomTabs from "@/components/common/CustomTabs";
import SettingTab from "./SettingTab";
import HelpCenterTab from "../HelpCenter/HelpCenterTab";


const tabs = [
  {
    value: "setting",
    label: "Setting",
    content: <SettingTab />,
  },
  {
    value: "Help center",
    label: "Help Center",
    content: <HelpCenterTab />,
  },
];

export default function SettingsTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("setting");

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");

    if (tabFromUrl === "help") {
      sessionStorage.setItem("settings-active-tab", "Help center");
      setActiveTab("Help center");
      return;
    }

    const savedTab = sessionStorage.getItem("settings-active-tab");

    setActiveTab(
      savedTab === "Help center" ? "Help center" : "setting",
    );
  }, [pathname, searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    sessionStorage.setItem("settings-active-tab", value);

    const params = new URLSearchParams(searchParams.toString());

    if (value === "Help center") {
      params.set("tab", "help");
    } else {
      params.delete("tab");
    }

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${pathname}?${query}` : pathname,
    );
  };

  return (
    <CustomTabs
      tabs={tabs}
      value={activeTab}
      onValueChange={handleTabChange}
    />
  );
}