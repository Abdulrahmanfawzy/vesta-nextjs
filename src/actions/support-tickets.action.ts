"use server";

import { getDetailsTicketsApi } from "@/api/ticket-details.api";


export async function getDetailsTicketsAction(ticketId: number) {
  return getDetailsTicketsApi(ticketId);
}