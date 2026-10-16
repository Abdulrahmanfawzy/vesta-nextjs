"use client";

import { markChatReadAction } from "@/actions/chat.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMarkChatRead(chatId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["chat-messages", chatId, "mark-read"],
    mutationFn: async () => {
      const result = await markChatReadAction(chatId);

      if (!result.success) {
        throw new Error(result.message || "Failed to mark messages as read.");
      }

      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatId],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to mark messages as read.",
      );
    },
  });
}
