import { Handbag } from "lucide-react";
import ChartsCard from "@/components/common/charts/ChartsCard";

function ReturnSummary() {
  const stats = [
    { value: "1,248", label: "Total Returns" },
    { value: "8.45%", label: "Return Rate (%)" },
    { value: "1,102", label: "Approved Returns" },
    { value: "96", label: "Rejected Returns" },
    { value: "50", label: "Pending Returns" },
  ];

  return (
    <ChartsCard title="return summary">
      <div className="flex items-start justify-evenly">
        {/* Return Icon */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white shadow-card-shadow">
          <Handbag size={52} strokeWidth={2.5} className="text-orange-500" />
        </div>

        {/* Statistics */}
        <div className="flex flex-col gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="leading-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-app-primary">•</span>

                  <span className="text-xl font-bold tracking-tight text-app-primary">
                    {stat.value}
                  </span>
                </div>

                <p className="text-sm text-app-primary">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartsCard>
  );
}

export default ReturnSummary;
