import {
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Wallet,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RefundStat, StatIcon, StatTone, TrendTone } from "../types/types";
const icons: Record<StatIcon, LucideIcon> = {
  refund: CircleDollarSign,
  wallet: Wallet,
  completed: ClipboardCheck,
  pending: Clock,
  rejected: XCircle,
};
const toneStyles: Record<StatTone, string> = {
  orange: "bg-orange-50 text-orange-500",
  indigo: "bg-indigo-50 text-indigo-500",
  green: "bg-emerald-50 text-emerald-600",
  red: "bg-red-50 text-red-500",
};
const trendStyles: Record<TrendTone, string> = {
  positive: "text-emerald-500",
  negative: "text-red-600",
  neutral: "text-muted-foreground",
};
function StatCard({ stat }: { stat: RefundStat }) {
  const Icon = icons[stat.icon];
  return (
    <Card className="rounded-xl border border-gray-300 bg-white shadow-md">
      <CardContent className="flex items-start gap-3 ">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg",
            toneStyles[stat.tone]
          )}
        >
          <Icon className="size-5" />
        </div>

        <div className="w-fit">
          <p className="truncate text-sm text-slate-600">{stat.label}</p>
          <p className="mt-0.5 truncate text-lg font-bold text-slate-900">
            {stat.value}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {stat.noteHighlight && (
              <span className={trendStyles[stat.trend]}>
                {stat.noteHighlight}
              </span>
            )}
            {stat.note}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
export default StatCard;