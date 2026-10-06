import QuickActions from "../components/QuickActions";
import ReturnReason from "../components/ReturnReason";
import ReturnsPerformance from "../components/ReturnsPerformance";
import ReturnSummary from "../components/ReturnSummary";
import TopReturnedProducts from "../components/TopReturnedProducts";

function Overview() {
  return (
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
      <div className="col-span-12 order-5 md:col-span-12 lg:order-none lg:col-span-8">
        <TopReturnedProducts />
      </div>
      <div className="col-span-12 order-4 md:col-span-6 lg:order-none lg:col-span-4">
        <QuickActions />
      </div>
    </div>
  );
}

export default Overview;
