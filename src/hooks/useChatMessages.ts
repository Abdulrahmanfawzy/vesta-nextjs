"use client";

import { getChatMessagesAction } from "@/actions/chat.actions";
import { useInfiniteQuery } from "@tanstack/react-query";

const MESSAGES_PER_PAGE = 20;

export function useChatMessages(chatId: number) {
  return useInfiniteQuery({
    queryKey: ["chat-messages", chatId],
    queryFn: async ({ pageParam }) => {
      const result = await getChatMessagesAction(
        chatId,
        pageParam,
        MESSAGES_PER_PAGE,
      );

      if (!result.success) {
        throw new Error(result.message || "Failed to load chat messages.");
      }

      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined,
    enabled: Number.isSafeInteger(chatId) && chatId > 0,
  });
}
