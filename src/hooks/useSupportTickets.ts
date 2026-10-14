
"use client";

import { useQuery } from "@tanstack/react-query";

import type { GetSupportTicketsParams } from "../api/support.api";
import { getSupportTicketsApiAction } from "@/actions/support.actions";

export function useSupportTickets(
  params: GetSupportTicketsParams = {},
) {
  return useQuery({
    queryKey: ["support-tickets", params],
    queryFn: () => getSupportTicketsApiAction(params),
  });
}
