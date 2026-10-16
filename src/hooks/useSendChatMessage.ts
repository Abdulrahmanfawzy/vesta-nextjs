"use client";

import { sendChatMessageAction } from "@/actions/chat.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSendChatMessage(chatId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["chat-messages", chatId, "send"],
    mutationFn: async (payload: FormData) => {
      const result = await sendChatMessageAction(chatId, payload);

      if (!result.success) {
        throw new Error(result.message || "Failed to send chat message.");
      }

      return result;
    },
    onSuccess: async (result) => {
      toast.success(result.message || "Message sent successfully.");
      await queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatId],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to send chat message.",
      );
    },
  });
}
