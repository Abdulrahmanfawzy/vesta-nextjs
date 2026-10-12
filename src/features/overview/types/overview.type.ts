export interface OverviewResponse {
  success: string;
  message: string;
  data: {
    summary: Summary;
    performance: Performance;
    reasons: Reason[];
    top_products: TopProduct[];
  };
}

interface Performance {
  chart_data: ChartData[];
  comparison: Comparison;
}

interface ChartData {
  date: Date;
  total: number;
}

interface Comparison {
  previous_period_total: number;
  percentage_change: string;
  trend: string;
}

interface Reason {
  reason: string;
  count: number;
  percentage: string;
}

interface Summary {
  total_returns: number;
  return_rate: string;
  approved_returns: number;
  rejected_returns: number;
  pending_returns: number;
}

interface TopProduct {
  product_id: number;
  product_name: string;
  product_image_url: string;
  total_quantity_returned: string;
  number_of_returns: number;
  return_rate: string;
  trend: number[];
}
