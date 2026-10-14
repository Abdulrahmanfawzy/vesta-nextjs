"use client";

import { getDetailsTicketsAction } from "@/actions/support-tickets.action";
import { useQuery } from "@tanstack/react-query";


export function useTicketDetails(ticketId: string) {
  return useQuery({
    queryKey: ["ticket-details", ticketId],
    queryFn: () => getDetailsTicketsAction(Number(ticketId)),
    enabled: Boolean(ticketId) && Number.isFinite(Number(ticketId)),
  });
}