"use client";

import { Check, Headphones, Pencil, Trash2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteChatMessage } from "@/hooks/useDeleteChatMessage";
import { useUpdateChatMessage } from "@/hooks/useUpdateChatMessage";
import type { ChatMessage } from "@/types/chat.types";
import { formatTicketDate } from "@/lib/format-date";
import { MAX_CHAT_MESSAGE_LENGTH } from "@/lib/chat-attachments";

interface MessageBubbleProps {
  message: ChatMessage;
  chatId: number;
  currentUserId: string | null;
}

function formatFileSize(size: number | null) {
  if (size === null) return null;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MessageBubble({
  message,
  chatId,
  currentUserId,
}: MessageBubbleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(message.body);
  const senderName = message.sender.name || "Unknown sender";
  const isSupport = message.sender.type === "owner";
  const isOwnMessage =
    currentUserId !== null && String(message.sender.id) === currentUserId;
  const { isPending: isDeleting, mutate: deleteMessage } =
    useDeleteChatMessage(chatId);
  const { isPending: isUpdating, mutateAsync: updateMessage } =
    useUpdateChatMessage(chatId);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editedBody.trim() || editedBody.length > MAX_CHAT_MESSAGE_LENGTH) return;

    try {
      await updateMessage({ messageId: message.id, body: editedBody });
      setIsEditing(false);
    } catch {
      // The mutation displays the API error to the user.
    }
  };

  return (
    <article className="group flex gap-3">
      <div
        aria-hidden="true"
        className={`flex size-9 shrink-0 items-center justify-center rounded-full  text-sm font-semibold  ${isSupport ? 'text-app-primary bg-[#e0edfca1] ':'bg-app-primary  text-white'} `}
      >
        {isSupport ? < Headphones/> :senderName.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 max-w-[85%]">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-app-primary">{senderName}</p>
          <span className="text-xs font-bold text-muted-foreground">
            {isSupport ? "Support" : "Seller"}
          </span>
          <time
            dateTime={message.created_at}
            className="text-xs text-muted-foreground"
          >
            {formatTicketDate(message.created_at)}
          </time>
          {isOwnMessage && message.body && !isEditing && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Edit message"
              title="Edit message"
              disabled={isDeleting || isUpdating}
              onClick={() => {
                setEditedBody(message.body);
                setIsEditing(true);
              }}
              className="text-muted-foreground opacity-100 hover:text-app-primary sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <Pencil />
            </Button>
          )}
          {isOwnMessage && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Delete message"
              title="Delete message"
              disabled={isDeleting || isUpdating}
              onClick={() => {
                if (window.confirm("Delete this message?")) {
                  deleteMessage(message.id);
                }
              }}
              className="text-muted-foreground opacity-100 hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <Trash2 />
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-2">
            <Textarea
              value={editedBody}
              onChange={(event) => setEditedBody(event.target.value)}
              maxLength={MAX_CHAT_MESSAGE_LENGTH}
              disabled={isUpdating}
              aria-label="Edit message"
              className="min-h-20 min-w-64"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                size="sm"
                disabled={!editedBody.trim() || isUpdating}
              >
                <Check />
                Save
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isUpdating}
                onClick={() => {
                  setEditedBody(message.body);
                  setIsEditing(false);
                }}
              >
                <X />
                Cancel
              </Button>
            </div>
          </form>
        ) : message.body ? (
          <p
            className={`w-fit max-w-full whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
              isSupport
                ? "rounded-tl-md bg-app-primary text-primary-foreground"
                : "rounded-tl-md bg-[#e0edfca1] text-app-primary"
            }`}
          >
            {message.body}
          </p>
        ) : null}

        {message.attachments.length > 0 && (
          <ul className="mt-2 space-y-2">
            {message.attachments.map((attachment) => (
              <li key={attachment.id}>
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex max-w-full flex-col rounded-lg border border-app-neutral-light px-3 py-2 text-sm text-app-primary underline-offset-2 hover:underline"
                >
                  <span className="break-all">
                    {attachment.type || attachment.mime_type || "Attachment"}
                  </span>
                  {formatFileSize(attachment.size) && (
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
