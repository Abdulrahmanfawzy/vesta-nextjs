"use client";

import { useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import CustomTabs from "@/components/common/CustomTabs";
import Attachments from "./Attachments";
import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useOpenTicketChat } from "@/hooks/useOpenTicketChat";
import { useMarkChatRead } from "@/hooks/useMarkChatRead";

interface ConversationProps {
  ticketId: number;
}

export default function Conversation({ ticketId }: ConversationProps) {
  const {
    data: chatResponse,
    error: chatError,
    isPending: isOpeningChat,
    mutate: openChat,
  } = useOpenTicketChat(ticketId);

  useEffect(() => {
    openChat();
  }, [openChat, ticketId]);

  const chatId = chatResponse?.data.id ?? 0;
  const { mutate: markChatRead } = useMarkChatRead(chatId);
  const {
    data: messagesResponse,
    error: messagesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: areMessagesPending,
  } = useChatMessages(chatId);

  useEffect(() => {
    if (chatId > 0) {
      markChatRead();
    }
  }, [chatId, markChatRead]);

  // The API returns newest-first pages; reverse the combined results for chat order.
  const messages =
    messagesResponse?.pages.flatMap((page) => page.data).reverse() ?? [];

  const tabs = [
    {
      value: "conversation",
      label: "Conversation",
      content: (
        <div className="space-y-6">
          {isOpeningChat ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Opening conversation...
            </p>
          ) : chatError ? (
            <p role="alert" className="py-8 text-center text-sm text-destructive">
              {chatError instanceof Error
                ? chatError.message
                : "Failed to open ticket chat."}
            </p>
          ) : chatResponse ? (
            <>
              <div className="rounded-xl border border-app-neutral-light p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-app-primary">
                      {chatResponse.data.ticket.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chatResponse.data.ticket.category} · Chat #
                      {chatResponse.data.id}
                    </p>
                  </div>
                  <span className="text-xs capitalize text-muted-foreground">
                    {chatResponse.data.ticket.status.replace("_", " ")}
                  </span>
                </div>

                {areMessagesPending ? (
                  <p className="mt-4 border-t border-app-neutral-light pt-3 text-sm text-muted-foreground">
                    Loading messages...
                  </p>
                ) : messagesError && !messagesResponse ? (
                  <p
                    role="alert"
                    className="mt-4 border-t border-app-neutral-light pt-3 text-sm text-destructive"
                  >
                    {messagesError instanceof Error
                      ? messagesError.message
                      : "Failed to load chat messages."}
                  </p>
                ) : messages.length === 0 ? (
                  <p className="mt-4 border-t border-app-neutral-light pt-3 text-sm text-muted-foreground">
                    No messages in this conversation yet.
                  </p>
                ) : (
                  <div className="mt-4 space-y-5 border-t border-app-neutral-light pt-4">
                    {messagesError && (
                      <p role="alert" className="text-sm text-destructive">
                        {messagesError instanceof Error
                          ? messagesError.message
                          : "Failed to load older messages."}
                      </p>
                    )}
                    {hasNextPage && (
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => fetchNextPage()}
                          disabled={isFetchingNextPage}
                          className="text-sm font-medium text-app-primary hover:underline disabled:opacity-50"
                        >
                          {isFetchingNextPage
                            ? "Loading older messages..."
                            : "Load older messages"}
                        </button>
                      </div>
                    )}
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        chatId={chatResponse.data.id}
                        currentUserId={chatResponse.currentUserId}
                      />
                    ))}
                  </div>
                )}
              </div>
              <MessageComposer chatId={chatResponse.data.id} />
            </>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Opening conversation...
            </p>
          )}
        </div>
      ),
    },
    {
      value: "Attachments",
      label: "Attachments",
      content: <Attachments />,
    },
  ];

  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm">
      <CardHeader className="px-5 py-4 sm:px-6">
        <CustomTabs tabs={tabs} />
      </CardHeader>
    </Card>
  );
}
