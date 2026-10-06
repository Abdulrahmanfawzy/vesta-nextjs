import DashboardHeader from "@/components/layout/DashboardHeader";
import Overview from "@/features/overview/pages/Overview";

function page() {
  return (
    <>
      <DashboardHeader pageName="overview" />
      <Overview />
    </>
  );
}

export default page;
