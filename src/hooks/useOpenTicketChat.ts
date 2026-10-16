"use client";

import { openTicketChatAction } from "@/actions/chat.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOpenTicketChat(ticketId: number) {
  return useMutation({
    mutationKey: ["ticket-chat", ticketId],
    mutationFn: async () => {
      const result = await openTicketChatAction(ticketId);

      if (!result.success) {
        throw new Error(result.message || "Failed to open ticket chat.");
      }

      return result;
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to open ticket chat.",
      );
    },
  });
}
