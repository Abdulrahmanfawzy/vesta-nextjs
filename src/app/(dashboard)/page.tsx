import DashboardHeader from "@/components/layout/DashboardHeader";
import Overview from "@/features/overview/pages/Overview";

// this is OverView Page On Dashboard
function page() {
  return (
    <>
      <DashboardHeader pageName="overview" />
      <Overview />
    </>
  );
}

export default page;
