import CustomTabs from "@/components/common/CustomTabs";

import HelpCenterTab from "./_components/HelpCenter/HelpCenterTab";
import SettingTab from "./_components/setting/SettingTab";
import DashboardHeader from "@/components/layout/DashboardHeader";

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
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default Page;
