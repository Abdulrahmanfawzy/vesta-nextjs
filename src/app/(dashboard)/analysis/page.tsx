import DashboardHeader from "@/components/layout/DashboardHeader";
import FinancialImpactChart from "@/features/analysis/components/FinancialImpactChart";
import ReturnByCustomer from "@/features/analysis/components/ReturnByCustomer";
import ReturnByReason from "@/features/analysis/components/ReturnByReason";
import ReturnFunnel from "@/features/analysis/components/ReturnFunnel";
import ReturnsByProduct from "@/features/analysis/components/ReturnsByProduct";
import ReturnsOverTime from "@/features/analysis/components/ReturnsOverTime";

const analysisCards = [
  {
    component: <ReturnsOverTime />,
  },
  {
    component: <ReturnByCustomer />,
  },
  {
    component: <ReturnByReason />,
  },
  {
    component: <ReturnsByProduct />,
  },
  {
    component: <ReturnFunnel />,
  },
  {
    component: <FinancialImpactChart />,
  },
];

function page() {
  return (
    <>
      <DashboardHeader pageName="Analysis" />
      <div className="grid mt-4 grid-cols-12 w-full gap-6">
        {analysisCards.map(({ component }, i) => {
          return (
            <div key={i} className="col-span-12 md:col-span-6 lg:col-span-4">
              {component}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default page;
