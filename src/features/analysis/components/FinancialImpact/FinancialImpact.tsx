import ChartsCard from "@/components/common/charts/ChartsCard";
import FinancialCardList from "./FinancialCardList";
import FinancialImpactChart from "./FinancialImpactChart";
import { getFinancialImpact } from "../../api/analysis.api";

async function FinancialImpact() {
  const { data } = await getFinancialImpact();

  return (
    <ChartsCard title="FINANCIAL IMPACT">
      <FinancialCardList />

      <FinancialImpactChart chart_data={data?.timeline} />
    </ChartsCard>
  );
}

export default FinancialImpact;
