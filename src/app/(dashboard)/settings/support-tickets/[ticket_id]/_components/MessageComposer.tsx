"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSendChatMessage } from "@/hooks/useSendChatMessage";
import {
  CHAT_ATTACHMENT_EXTENSIONS,
  MAX_CHAT_MESSAGE_LENGTH,
  validateChatAttachments,
} from "@/lib/chat-attachments";
import { toast } from "sonner";

interface MessageComposerProps {
  chatId: number;
}

export default function MessageComposer({ chatId }: MessageComposerProps) {
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isPending, mutateAsync } = useSendChatMessage(chatId);

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const nextAttachments = [...attachments, ...selectedFiles];
    const validationError = validateChatAttachments(nextAttachments);

    if (validationError) {
      toast.error(validationError);
      event.target.value = "";
      return;
    }

    setAttachments(nextAttachments);
    event.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((currentAttachments) =>
      currentAttachments.filter((_, attachmentIndex) => attachmentIndex !== index),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ((!body.trim() && attachments.length === 0) || isPending) return;

    try {
      const payload = new FormData();
      if (body.trim()) payload.append("body", body);
      attachments.forEach((attachment) =>
        payload.append("attachments[]", attachment),
      );

      await mutateAsync(payload);
      setBody("");
      setAttachments([]);
    } catch {
      // The mutation displays the API error to the user.
    }
  };

  return (
    <form
      className="flex items-end gap-2 p-4 sm:p-5"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-2 rounded-2xl border border-app-primary/30 bg-muted/30 p-2 transition-colors focus-within:border-app-primary/80">
        {attachments.length > 0 && (
          <ul className="flex flex-wrap gap-2 px-1 pt-1">
            {attachments.map((attachment, index) => (
              <li
                key={`${attachment.name}-${attachment.lastModified}-${index}`}
                className="flex max-w-full items-center gap-2 rounded-lg bg-background px-2 py-1 text-xs"
              >
                <span className="max-w-48 truncate">{attachment.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${attachment.name}`}
                  disabled={isPending}
                  onClick={() => removeAttachment(index)}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <Textarea
          placeholder="Type a message..."
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={MAX_CHAT_MESSAGE_LENGTH}
          disabled={isPending}
          aria-label="Message"
          className="min-h-8 w-full resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={CHAT_ATTACHMENT_EXTENSIONS.map((extension) => `.${extension}`).join(",")}
            onChange={handleFileSelection}
            disabled={isPending}
            className="sr-only"
            aria-label="Choose attachments"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Attach files"
            title="Attach files (up to 5, 10 MB each)"
            disabled={isPending || attachments.length >= 5}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="size-4" />
          </Button>
          <span className="pr-2 text-xs text-muted-foreground">
            {body.length}/{MAX_CHAT_MESSAGE_LENGTH}
          </span>
        </div>
      </div>

      <Button
        type="submit"
        size="sm"
        disabled={(!body.trim() && attachments.length === 0) || isPending}
        className="min-h-13.25 w-23.75 shrink-0 rounded-full bg-app-primary px-3 py-2"
      >
        <Send className="size-4" />
        <span className="hidden sm:inline ">
          {isPending ? "Sending..." : "Send"}
        </span>
      </Button>
    </form>
  );
}