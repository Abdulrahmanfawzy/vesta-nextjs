import ChartsCard from "@/components/common/charts/ChartsCard";
import ReasonChart from "@/components/common/charts/ReasonChart";
import { getReturnByCustomer } from "../api/analysis.api";
import { chartColors } from "@/constant/chartColors";

async function ReturnByCustomer() {
  const { data } = await getReturnByCustomer();
  const returnsByCustomer = data?.segments?.map((segment, index) => ({
    name: segment.label,
    value: segment.count,
    color: chartColors[index % chartColors.length],
  }));
  return (
    <ChartsCard title="RETURNS BY CUSTOMER">
      <ReasonChart ReturnData={returnsByCustomer} />
    </ChartsCard>
  );
}

export default ReturnByCustomer;
