import PerformanceChart from "@/components/common/charts/PerformanceChart";
import ChartsCard from "@/components/common/charts/ChartsCard";

const data = [
  { date: "May 1", returns: 120 },
  { date: "May 5", returns: 115 },
  { date: "May 10", returns: 160 },
  { date: "May 15", returns: 210 },
  { date: "May 20", returns: 220 },
  { date: "May 25", returns: 215 },
  { date: "May 30", returns: 280 },
  { date: "Jun 1", returns: 330 },
];
function ReturnsOverTime() {
  return (
    <ChartsCard title="RETURNS OVER TIME">
      <PerformanceChart
        data={data}
        dataKey="returns"
        description={[
          "Returns Over Time(Line Chart)",
          "Comparison with Previous Period",
          "Filters (Date Range)",
        ]}
        selectedIndex={6}
        fillColor="#D9D9D9"
        strokeColor="#161C36"
      />
    </ChartsCard>
  );
}

export default ReturnsOverTime;
