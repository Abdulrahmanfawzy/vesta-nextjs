import ReasonChart from "@/components/common/charts/ReasonChart";
import ChartsCard from "@/components/common/charts/ChartsCard";
import { OverviewResponse } from "../types/overview.type";
import { chartColors } from "@/constant/chartColors";

function ReturnReason({
  reasons,
}: {
  reasons: OverviewResponse["data"]["reasons"];
}) {
  //
  const reasonData = reasons.map((reason, index) => ({
    name: reason.reason,
    value: reason.count,
    color: chartColors[index % chartColors.length],
  }));

  return (
    <ChartsCard title="RETURN REASONS">
      <ReasonChart ReturnData={reasonData} />
    </ChartsCard>
  );
}

export default ReturnReason;
