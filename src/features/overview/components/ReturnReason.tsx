import ReasonChart from "@/components/common/charts/ReasonChart";
import ChartsCard from "@/components/common/charts/ChartsCard";
import { OverviewResponse } from "../types/overview.type";

const ReasonsColors = [
  {
    color: "var(--color-app-primary)",
  },
  {
    color: "var(--color-app-accent-peach)",
  },
  {
    color: "var(--color-app-accent-orange)",
  },
  {
    color: "var(--color-app-neutral-light)",
  },
  {
    color: "var(--color-app-neutral)",
  },
];

function ReturnReason({
  reasons,
}: {
  reasons: OverviewResponse["data"]["reasons"];
}) {
  //
  const reasonData = reasons.map((reason, index) => ({
    name: reason.reason,
    value: reason.count,
    color: ReasonsColors[index % ReasonsColors.length].color,
  }));

  return (
    <ChartsCard title="RETURN REASONS">
      <ReasonChart ReturnData={reasonData} />
    </ChartsCard>
  );
}

export default ReturnReason;
