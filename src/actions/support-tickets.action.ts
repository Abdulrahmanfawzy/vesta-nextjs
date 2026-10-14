"use server";

import { closeTicket, getDetailsTicketsApi } from "@/api/ticket-details.api";


export async function getDetailsTicketsAction(ticketId: number) {
  return getDetailsTicketsApi(ticketId);
}



export async function closeTicketAction(ticketId: number) {
return closeTicket(ticketId);
}