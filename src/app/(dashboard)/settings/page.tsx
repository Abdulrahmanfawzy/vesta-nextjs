import CustomTabs from "@/components/common/CustomTabs";

import HelpCenterTab from "./_components/HelpCenter/HelpCenterTab";
import SettingTab from "./_components/setting/SettingTab";
import DashboardHeader from "@/components/layout/DashboardHeader";
import QueryProvider from "./_components/providers/QueryProvider";


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

const Page = () => {
  return (
    <div className="w-full min-w-0 px-4.5">
      <DashboardHeader pageName="Settings" />

      <QueryProvider>
        <CustomTabs tabs={tabs} />
      </QueryProvider>

    </div>
  );
};

export default Page;
