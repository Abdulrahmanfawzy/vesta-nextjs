export interface AnalysisResponse<T> {
  success: string;
  message: string;
  data: T;
}

export interface ReturnsOverTime {
  total_returns: number;
  previous_returns: number;
  percentage_change: number;
  timeline: Timeline[];
}

interface Timeline {
  date: string;
  current_count: number;
  previous_date: string;
  previous_count: number;
}

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
