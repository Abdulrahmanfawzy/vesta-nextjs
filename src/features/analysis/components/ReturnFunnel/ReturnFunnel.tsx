import ChartsCard from "@/components/common/charts/ChartsCard";
import { getReturnFunnel } from "../../api/analysis.api";
import ReturnFunnelChart from "./ReturnFunnelChart";

export default async function ReturnFunnelDetails() {
  const { data } = await getReturnFunnel();

  return (
    <ChartsCard title="RETURN FUNNEL DETAILS">
      <div className="flex items-center justify-center gap-4">
        <ReturnFunnelChart data={data} />

        <div className="flex flex-col gap-4">
          {data.stages.map((stage) => (
            <div key={stage.stage} className="leading-tight">
              <p className="text-xs font-semibold text-[#17203B]">
                {stage.stage}
              </p>

              <p className="mt-0.5 text-xs text-[#17203B]">
                {stage.count.toLocaleString()} ({stage.conversion_rate}%)
              </p>
            </div>
          ))}
        </div>
      </div>
    </ChartsCard>
  );
}
