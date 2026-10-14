"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeTicketAction } from "@/actions/support-tickets.action";
import { toast } from "sonner";

export function useCloseTicket(ticketId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => closeTicketAction(ticketId),

    onSuccess: async () => {
      toast.success("Ticket closed successfully");

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
          : "Failed to close ticket"
      );
    },
  });
}