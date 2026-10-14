
export interface SupportTicketsResponse {
  success: boolean;
  message: string;
  data: {
    tickets: SupportTicket[];
    pagination: Pagination;
  };
}

export interface SupportTicket {
  id: number;
  seller_id: number;
  created_by: number;
  assigned_agent_id: number | null;
  return_id: number | null;
  category: string;
  subject: string;
  description: string | null;
  status: TicketStatus;
  priority: string | null;
  rating: number | null;
  messages_count: number;
  seller: TicketSeller;
  creator: TicketCreator;
  assigned_to: TicketAgent | null;
  created_at: string;
  updated_at: string;
}

export type TicketStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed";

export interface TicketSeller {
  id: number;
  name: string;
}

export interface TicketCreator {
  id: number;
  name: string;
}

export interface TicketAgent {
  id: number;
  name: string;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  pages: number[];
  from: number | null;
  to: number | null;
  prev_page_url: string | null;
  next_page_url: string | null;
}
