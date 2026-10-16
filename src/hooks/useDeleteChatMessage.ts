"use client";

import { deleteChatMessageAction } from "@/actions/chat.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteChatMessage(chatId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["chat-messages", chatId, "delete"],
    mutationFn: async (messageId: number) => {
      const result = await deleteChatMessageAction(chatId, messageId);

      if (!result.success) {
        throw new Error(result.message || "Failed to delete message.");
      }

      return result;
    },
    onSuccess: async (result) => {
      toast.success(result.message || "Message deleted.");
      await queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatId],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete message.",
      );
    },
  });
}
