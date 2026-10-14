export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface FAQsResponse {
  success: boolean;
  message: string;
  data: FAQ[];
}

export type FAQSection =
  | "All"
  | "Returns"
  | "Refunds"
  | "Reports"
  | "Account"
  | "Integrations"
  | "Billing";