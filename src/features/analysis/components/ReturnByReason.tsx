import ChartsCard from "@/components/common/charts/ChartsCard";
import ReasonChart from "@/components/common/charts/ReasonChart";

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

function ReturnByReason() {
  return (
    <ChartsCard title="RETURNS BY REASON">
      <ReasonChart ReturnData={returnsByReason} />
    </ChartsCard>
  );
}

export default ReturnByReason;
