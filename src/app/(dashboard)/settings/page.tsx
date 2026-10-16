import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";
import QueryProvider from "./_components/providers/QueryProvider";
import SettingsTabs from "./_components/setting/SettingsTabs";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account configurations, store return policies, preferences, and help center resources.",
};

const Page = () => {
  return (
    <div className="w-full min-w-0 px-4.5">
      <DashboardHeader pageName="Settings" />

      <QueryProvider>
        <Suspense fallback={<div>Loading settings...</div>}>
          <SettingsTabs />
        </Suspense>

      </QueryProvider>

    </div>
  );
};

export default Page;
