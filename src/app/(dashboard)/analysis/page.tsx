import DashboardHeader from "@/components/layout/DashboardHeader";
import Analysis from "@/features/analysis/pages/Analysis";

function page() {
  return (
    <>
      <DashboardHeader pageName="Analysis" />
      <Analysis />
    </>
  );
}

export default page;
