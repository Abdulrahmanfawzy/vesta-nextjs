import DashboardHeader from "@/components/layout/DashboardHeader";
import { getOverviewReturn } from "./api/overview.api";
import ReturnSummary from "./components/ReturnSummary";
import ReturnsPerformance from "./components/ReturnsPerformance";
import ReturnReason from "./components/ReturnReason";
import TopReturnedProducts from "./components/TopReturnedProducts";
import QuickActions from "./components/QuickActions";

async function OverviewContent() {
  const overview = await getOverviewReturn();
  return (
    <>
      <DashboardHeader pageName="overview" />
      <div className="grid mt-4 grid-cols-12 w-full gap-6">
        <div className="col-span-12 order-1 md:col-span-6 lg:order-0 lg:col-span-4">
          <ReturnSummary summary={overview.data.summary} />
        </div>
        <div className="col-span-12 order-2 md:col-span-6 lg:order-0 lg:col-span-4">
          <ReturnsPerformance performance={overview.data.performance} />
        </div>
        <div className="col-span-12 order-3 md:col-span-6 lg:order-0 lg:col-span-4">
          <ReturnReason reasons={overview.data.reasons} />
        </div>
        <div className="col-span-12 order-5 md:col-span-12 lg:order-0 lg:col-span-8">
          <TopReturnedProducts
            topReturnedProducts={overview.data.top_products}
          />
        </div>
        <div className="col-span-12 order-4 md:col-span-6 lg:order-0 lg:col-span-4">
          <QuickActions export_data={overview.data.top_products} />
        </div>
      </div>
    </>
  );
}

export default OverviewContent;
