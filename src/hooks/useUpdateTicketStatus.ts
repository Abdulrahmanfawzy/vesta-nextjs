"use client";

import { updateTicketStatusAction } from "@/actions/support-tickets.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TicketStatus } from "@/types/support.types";
import { toast } from "sonner";

export function useUpdateTicketStatus(ticketId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ticket-status", ticketId],
    mutationFn: async (status: TicketStatus) => {
      const result = await updateTicketStatusAction(ticketId, status);

      if (!result.success) {
        throw new Error(result.message || "Failed to update ticket status.");
      }

      return result;
    },
    onSuccess: async (result) => {
      toast.success(result.message || "Ticket status updated successfully.");
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
          : "Failed to update ticket status.",
      );
    },
  });
}
