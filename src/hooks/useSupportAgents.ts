"use client";

import { getSupportAgentsAction } from "@/actions/support-tickets.action";
import { useQuery } from "@tanstack/react-query";

export function useSupportAgents() {
  return useQuery({
    queryKey: ["support-agents"],
    queryFn: getSupportAgentsAction,
  });
}
