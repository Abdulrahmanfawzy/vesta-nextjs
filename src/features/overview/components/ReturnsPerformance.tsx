import ChartsCard from "@/components/common/charts/ChartsCard";
import PerformanceChart from "@/components/common/charts/PerformanceChart";
import { OverviewResponse } from "../types/overview.type";

export default function ReturnsPerformance({
  performance,
}: {
  performance: OverviewResponse["data"]["performance"];
}) {
  return (
    <ChartsCard title="RETURNS PERFORMANCE">
      <PerformanceChart
        data={performance.chart_data}
        dataKey={"total"}
        selectedIndex={3}
        fillColor="#D9D9D9"
        strokeColor="#161C36"
      />
    </ChartsCard>
  );
}
