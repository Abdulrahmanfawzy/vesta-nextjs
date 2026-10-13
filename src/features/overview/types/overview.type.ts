import { ChartReason, ProductTable } from "@/types/global.type";

export interface OverviewResponse {
  success: string;
  message: string;
  data: {
    summary: Summary;
    performance: Performance;
    reasons: ChartReason[];
    top_products: ProductTable[];
  };
}

interface Performance {
  chart_data: ChartData[];
  comparison: Comparison;
}

interface ChartData {
  date: string;
  total: number;
}

interface Comparison {
  previous_period_total: number;
  percentage_change: string;
  trend: string;
}

interface Summary {
  total_returns: number;
  return_rate: string;
  approved_returns: number;
  rejected_returns: number;
  pending_returns: number;
}
