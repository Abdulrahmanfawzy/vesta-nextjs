import ChartsCard from "@/components/common/charts/ChartsCard";
import ReasonChart from "@/components/common/charts/ReasonChart";
import { getReturnByReason } from "../api/analysis.api";
import { chartColors } from "@/constant/chartColors";

const returnsByReason = [
  { name: "Wrong Size", value: 20, color: "var(--color-app-primary)" },
  { name: "Other", value: 18, color: "var(--color-app-neutral-dark)" },
  {
    name: "Customer Changed Mind",
    value: 22,
    color: "var(--color-app-neutral)",
  },
  {
    name: "Product Defect",
    value: 25,
    color: "var(--color-app-neutral-light)",
  },
  {
    name: "Wrong Product",
    value: 15,
    color: "var(--color-app-accent-orange)",
  },
];

async function ReturnByReason() {
  const { data } = await getReturnByReason();

  const ReturnData = data?.map((reason, index) => ({
    name: reason.label,
    value: reason.count,
    color: chartColors[index % chartColors.length],
  }));

  return (
    <ChartsCard title="RETURNS BY REASON">
      <ReasonChart ReturnData={ReturnData} />
    </ChartsCard>
  );
}

export default ReturnByReason;
