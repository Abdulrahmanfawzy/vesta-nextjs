import { refundStats } from "../constants/RefundState";
import { RefundCounts, RefundStat, TrendTone } from "../types/types";
import StatCard from "./StatCard";

export function buildRefundStats(counts?: RefundCounts): RefundStat[] {
  if (!counts) return refundStats;

  const formatPercentage = (val?: number) => {
    if (val === undefined || val === null) return undefined;
    const sign = val > 0 ? "+" : "";
    return `${sign}${val}%`;
  };

  const getTrend = (val?: number): TrendTone => {
    if (val === undefined || val === null || val === 0) return "neutral";
    return val > 0 ? "positive" : "negative";
  };

  return [
    {
      id: "total-refund",
      label: "Total Refund",
      value:
        counts.total_refund?.value != null
          ? counts.total_refund.value.toLocaleString()
          : "0",
      noteHighlight: formatPercentage(counts.total_refund?.percentage),
      note: " vs last 30 days",
      trend: getTrend(counts.total_refund?.percentage),
      tone: "orange",
      icon: "refund",
    },
    {
      id: "refunded-amount",
      label: "Refunded Amount",
      value:
        counts.refunded_amount?.value != null
          ? `$${counts.refunded_amount.value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "$0.00",
      noteHighlight: formatPercentage(counts.refunded_amount?.percentage),
      note: " vs last 30 days",
      trend: getTrend(counts.refunded_amount?.percentage),
      tone: "indigo",
      icon: "wallet",
    },
    {
      id: "completed",
      label: "Completed",
      value:
        counts.completed?.value != null
          ? counts.completed.value.toLocaleString()
          : "0",
      noteHighlight:
        counts.completed?.percentage != null
          ? `${counts.completed.percentage}%`
          : undefined,
      note: " of total",
      trend: "neutral",
      tone: "green",
      icon: "completed",
    },
    {
      id: "pending",
      label: "Pending",
      value:
        counts.pending?.value != null
          ? counts.pending.value.toLocaleString()
          : "0",
      noteHighlight:
        counts.pending?.percentage != null
          ? `${counts.pending.percentage}%`
          : undefined,
      note: " of total",
      trend: "neutral",
      tone: "orange",
      icon: "pending",
    },
    {
      id: "rejected",
      label: "Rejected",
      value:
        counts.rejected?.value != null
          ? counts.rejected.value.toLocaleString()
          : "0",
      noteHighlight:
        counts.rejected?.percentage != null
          ? `${counts.rejected.percentage}%`
          : undefined,
      note: " of total",
      trend: "negative",
      tone: "red",
      icon: "rejected",
    },
  ];
}

interface RefundStatsProps {
  stats?: RefundStat[];
  data?: RefundCounts;
  counts?: RefundCounts;
}

export function RefundStats({ stats, data, counts }: RefundStatsProps) {
  const cards = stats ?? buildRefundStats(data ?? counts);

  return (
    <div className="grid grid-cols-1 mt-10 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}