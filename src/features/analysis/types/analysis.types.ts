export interface AnalysisResponse<T> {
  success: string;
  message: string;
  data: T;
}

// Return over time
export interface ReturnsOverTime {
  total_returns: number;
  previous_returns: number;
  percentage_change: number;
  timeline: OverTimeline[];
}

interface OverTimeline {
  date: string;
  current_count: number;
  previous_date: string;
  previous_count: number;
}

// Return funnel
export interface ReturnsFunnel {
  total_requests: number;
  stages: FunnelStage[];
}

interface FunnelStage {
  stage: string;
  count: number;
  conversion_rate: number;
  drop_off_rate: number;
}

// Return by customers
export interface ReturnCustomer {
  total_customers: number;
  segments: CustomerSegment[];
}

interface CustomerSegment {
  key: string;
  label: string;
  count: number;
  percentage: number;
  segment: string;
}

// Return by reason
export interface ReturnByReason {
  key: string;
  label: string;
  count: number;
  percentage: number;
  reason: string;
}

// Financial impact
export interface FinancialImpact {
  currency: string;
  total_refunds: number;
  cost_of_returns: number;
  net_impact: number;
  return_rate: number;
  timeline: FinancialTimeline[];
}

interface FinancialTimeline {
  date: string;
  amount: number;
}
