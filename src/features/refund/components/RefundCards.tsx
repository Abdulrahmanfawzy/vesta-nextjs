import {  refundStats } from "../constants/RefundState";
import { RefundStat } from "../types/types";
import StatCard from "./StatCard";


export function RefundStats({ stats = refundStats }: { stats?: RefundStat[] }) {
  return (
    <div className="grid grid-cols-1 mt-10 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}