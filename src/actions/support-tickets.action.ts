"use server";

import {
  closeTicket,
  getDetailsTicketsApi,
  updateTicketStatus,
} from "@/api/ticket-details.api";
import type { TicketStatus } from "@/types/support.types";


export async function getDetailsTicketsAction(ticketId: number) {
  return getDetailsTicketsApi(ticketId);
}



export async function closeTicketAction(ticketId: number) {
return closeTicket(ticketId);
}

export async function updateTicketStatusAction(
  ticketId: number,
  status: TicketStatus,
) {
  return updateTicketStatus(ticketId, status);
}