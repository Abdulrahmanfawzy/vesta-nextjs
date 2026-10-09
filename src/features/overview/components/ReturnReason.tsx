"use client";
import ReasonChart from "@/components/common/charts/ReasonChart";
import ChartsCard from "@/components/common/charts/ChartsCard";

const returnReasons = [
  {
    name: "Product Defect",
    value: 45,
    color: "var(--color-app-primary)",
  },
  {
    name: "Wrong Size",
    value: 30,
    color: "var(--color-app-accent-peach)",
  },
  {
    name: "Wrong Product",
    value: 10,
    color: "var(--color-app-accent-orange)",
  },
  {
    name: "Customer Changed Mind",
    value: 8,
    color: "var(--color-app-neutral-light)",
  },
  {
    name: "Other",
    value: 7,
    color: "var(--color-app-neutral)",
  },
];

function ReturnReason() {
  return (
    <ChartsCard title="RETURN REASONS">
      <ReasonChart ReturnData={returnReasons} />
    </ChartsCard>
  );
}

export default ReturnReason;
