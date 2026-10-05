import DashboardHeader from "@/components/layout/DashboardHeader";

function page() {
  return (
    <>
      <DashboardHeader pageName="overview" />
      <div className="h-[2500px]">Home</div>;
    </>
  );
}

export default page;
