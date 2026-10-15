"use client";

import { assignSupportAgentAction } from "@/actions/support-tickets.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAssignSupportAgent(ticketId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ticket-assignment", ticketId],
    mutationFn: async (assignedAgentId: number | null) => {
      const result = await assignSupportAgentAction(ticketId, assignedAgentId);

      if (!result.success) {
        throw new Error(result.message || "Failed to assign support agent.");
      }

      return result;
    },
    onSuccess: async (result) => {
      toast.success(result.message || "Support agent assignment updated.");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["ticket-details", String(ticketId)],
        }),
        queryClient.invalidateQueries({
          queryKey: ["support-tickets"],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to assign support agent.",
      );
    },
  });
}
