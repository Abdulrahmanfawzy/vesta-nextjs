"use client";

import { updateChatMessageAction } from "@/actions/chat.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateMessageInput {
  messageId: number;
  body: string;
}

export function useUpdateChatMessage(chatId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["chat-messages", chatId, "update"],
    mutationFn: async ({ messageId, body }: UpdateMessageInput) => {
      const result = await updateChatMessageAction(chatId, messageId, body);

      if (!result.success) {
        throw new Error(result.message || "Failed to edit message.");
      }

      return result;
    },
    onSuccess: async (result) => {
      toast.success(result.message || "Message updated.");
      await queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatId],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to edit message.",
      );
    },
  });
}
