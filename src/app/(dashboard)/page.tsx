import DashboardHeader from "@/components/layout/DashboardHeader";
import QuickActions from "@/features/overview/components/QuickActions";
import ReturnReason from "@/features/overview/components/ReturnReason";
import ReturnsPerformance from "@/features/overview/components/ReturnsPerformance";
import ReturnSummary from "@/features/overview/components/ReturnSummary";
import TopReturnedProducts from "@/features/overview/components/TopReturnedProducts";

// this is OverView Page On Dashboard
function page() {
  return (
    <>
      <DashboardHeader pageName="overview" />
      <div className="grid mt-4 grid-cols-12 w-full gap-6">
        <div className="col-span-12 order-1 md:col-span-6 lg:order-0 lg:col-span-4">
          <ReturnSummary />
        </div>
        <div className="col-span-12 order-2 md:col-span-6 lg:order-0 lg:col-span-4">
          <ReturnsPerformance />
        </div>
        <div className="col-span-12 order-3 md:col-span-6 lg:order-0 lg:col-span-4">
          <ReturnReason />
        </div>
        <div className="col-span-12 order-5 md:col-span-12 lg:order-0 lg:col-span-8">
          <TopReturnedProducts />
        </div>
        <div className="col-span-12 order-4 md:col-span-6 lg:order-0 lg:col-span-4">
          <QuickActions />
        </div>
      </div>
    </>
  );
}

export default page;
