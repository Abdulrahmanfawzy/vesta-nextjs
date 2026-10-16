"use client";

import {
  AlertCircle,
  Download,
  FileAudio2,
  FileImage,
  FileText,
  FileVideo2,
  LoaderCircle,
  Paperclip,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAttachmentsChat } from "@/hooks/useGetAttachmentsChat";
import type { TicketAttachment } from "@/types/support.types";

interface AttachmentsProps {
  ticketId: number;
}

function getAttachmentName(attachment: TicketAttachment) {
  return (
    attachment.original_name ||
    attachment.file_name ||
    attachment.name ||
    `Attachment ${attachment.id}`
  );
}

function formatFileSize(size?: number | null) {
  if (size == null) return null;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatUploadDate(date?: string | null) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function getAttachmentIcon(attachment: TicketAttachment) {
  const mimeType = attachment.mime_type ?? "";
  const extension = getAttachmentName(attachment).split(".").pop()?.toLowerCase();

  if (mimeType.startsWith("image/") || ["jpg", "jpeg", "png", "webp"].includes(extension ?? "")) {
    return FileImage;
  }
  if (mimeType.startsWith("video/") || ["mp4", "mov"].includes(extension ?? "")) {
    return FileVideo2;
  }
  if (mimeType.startsWith("audio/") || ["mp3", "wav"].includes(extension ?? "")) {
    return FileAudio2;
  }
  return FileText;
}

function isImageAttachment(attachment: TicketAttachment) {
  const extension = getAttachmentName(attachment).split(".").pop()?.toLowerCase();
  return (
    attachment.mime_type?.startsWith("image/") ||
    ["jpg", "jpeg", "png", "webp"].includes(extension ?? "")
  );
}

function AttachmentCard({ attachment }: { attachment: TicketAttachment }) {
  const name = getAttachmentName(attachment);
  const Icon = getAttachmentIcon(attachment);
  const uploadedDate = formatUploadDate(attachment.created_at);

  return (
    <article className="group overflow-hidden rounded-xl border border-border/70 bg-card transition-shadow hover:shadow-md">
      <a
        href={attachment.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open attachment ${name}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-primary"
      >
        <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-muted/50">
          {isImageAttachment(attachment) ? (
            // The server supplies public attachment URLs; use a regular img for external hosts.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={attachment.url}
              alt={name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-2xl bg-background text-app-primary shadow-sm">
              <Icon className="size-8" strokeWidth={1.6} />
            </div>
          )}
          <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/95 text-app-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <Download className="size-4" />
          </span>
        </div>
      </a>

      <div className="space-y-1.5 p-3">
        <p className="truncate text-sm font-medium text-app-primary" title={name}>
          {name}
        </p>
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="truncate">
            {attachment.type || attachment.mime_type || "File"}
          </span>
          {formatFileSize(attachment.size) && (
            <span className="shrink-0">{formatFileSize(attachment.size)}</span>
          )}
        </div>
        {uploadedDate && (
          <p className="text-xs text-muted-foreground">Added {uploadedDate}</p>
        )}
      </div>
    </article>
  );
}

export default function Attachments({ ticketId }: AttachmentsProps) {
  const { data, error, isPending, refetch, isFetching } =
    useGetAttachmentsChat(ticketId);
  const attachments = data?.data.attachments ?? [];

  if (isPending) {
    return (
      <div
        className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground"
        role="status"
      >
        <LoaderCircle className="size-4 animate-spin" />
        Loading attachments...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center"
      >
        <AlertCircle className="size-8 text-destructive" />
        <p className="text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load ticket attachments."}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={isFetching ? "animate-spin" : ""} />
          Try again
        </Button>
      </div>
    );
  }

  if (attachments.length === 0) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Paperclip className="size-5" />
        </div>
        <h3 className="text-sm font-semibold text-app-primary">
          No attachments yet
        </h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Files attached to this support ticket will appear here.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Ticket attachments" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-app-primary">
            Ticket attachments
          </h2>
          <p className="text-sm text-muted-foreground">
            {attachments.length} {attachments.length === 1 ? "file" : "files"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {attachments.map((attachment) => (
          <AttachmentCard key={attachment.id} attachment={attachment} />
        ))}
      </div>
    </section>
  );
}
