import ChartsCard from "@/components/common/charts/ChartsCard";
import ReasonChart from "@/components/common/charts/ReasonChart";

const returnsByCustomer = [
  { name: "New Customers", value: 40, color: "var(--color-app-neutral-light)" },
  {
    name: "Returning Customers",
    value: 35,
    color: "var(--color-app-accent-orange)",
  },
  { name: "Loyal Customers", value: 25, color: "var(--color-app-primary)" },
];
function ReturnByCustomer() {
  return (
    <ChartsCard title="RETURNS BY CUSTOMER">
      <ReasonChart ReturnData={returnsByCustomer} />
    </ChartsCard>
  );
}

export default ReturnByCustomer;
