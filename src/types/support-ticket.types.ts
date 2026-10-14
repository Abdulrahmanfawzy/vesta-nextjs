export interface TicketUser {
  id: number;
  name: string;
}

export interface Ticket {
  id: number;
  seller_id: number;
  created_by: number;
  assigned_agent_id: number | null;
  return_id: number | null;
  category: string;
  subject: string;
  description: string | null;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: string | null;
  rating: number | null;
  messages_count: number;
  seller: TicketUser;
  creator: TicketUser;
  assigned_to: TicketUser | null;
  created_at: string;
  updated_at: string;
}

export interface TicketDetailsResponse {
  success: boolean;
  message: string;
  data: Ticket;
}