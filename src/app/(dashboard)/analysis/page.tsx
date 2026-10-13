import type { Metadata } from "next";
import { Suspense } from "react";

import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Analysis",
  description:
    "Comprehensive analytics on returns over time, return reasons, customer behaviors, and financial impact.",
};

import FinancialImpact from "@/features/analysis/components/FinancialImpact/FinancialImpact";
import ReturnByCustomer from "@/features/analysis/components/ReturnByCustomer";
import ReturnByReason from "@/features/analysis/components/ReturnByReason";
import ReturnFunnel from "@/features/analysis/components/ReturnFunnel/ReturnFunnel";
import ReturnsByProduct from "@/features/analysis/components/ReturnsByProduct";
import ReturnsOverTime from "@/features/analysis/components/ReturnsOverTime";
import ChartSkeleton from "@/features/analysis/components/ChartSkeleton";

const analysisCards = [
  { component: ReturnsOverTime },
  { component: ReturnByCustomer },
  { component: ReturnByReason },
  { component: ReturnsByProduct },
  { component: ReturnFunnel },
  { component: FinancialImpact },
];

function Page() {
  return (
    <>
      <DashboardHeader pageName="Analysis" />

      <div className="grid mt-4 grid-cols-12 w-full gap-6">
        {analysisCards.map(({ component: Component }, i) => (
          <div key={i} className="col-span-12 md:col-span-6 lg:col-span-4">
            <Suspense fallback={<ChartSkeleton />}>
              <Component />
            </Suspense>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
