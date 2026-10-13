import PerformanceChart from "@/components/common/charts/PerformanceChart";
import ChartsCard from "@/components/common/charts/ChartsCard";
import { getReturnOverTime } from "../api/analysis.api";

async function ReturnsOverTime() {
  const { data } = await getReturnOverTime();

  const overTimedata = data?.timeline?.map((item) => ({
    date: item.date,
    total: item.current_count,
  }));

  return (
    <ChartsCard title="RETURNS OVER TIME">
      <PerformanceChart
        data={overTimedata}
        dataKey="total"
        selectedIndex={6}
        fillColor="#D9D9D9"
        strokeColor="#161C36"
      />
    </ChartsCard>
  );
}

export default ReturnsOverTime;
