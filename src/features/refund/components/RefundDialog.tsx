"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  RotateCcw,
  Calendar,
  Clock3,
  CheckCircle2,
  AlertCircle,
  FileText,
  Copy,
  Check,
  Package,
  ShieldCheck,
} from "lucide-react";

export type RefundDetails = {
  id?: string;
  orderId: string;
  productName?: string;
  image?: string | { src: string };
  refundReason?: string;
  refundAmount?: number;
  status: string;
  RequestDate?: string;
  OrderDate?: string;
  refundDate?: string;
  ReturnRequestID?: string;
  itemID?: string;
  customer?: {
    name: string;
    email?: string;
    image?: string | { src: string };
  };
};

export interface RefundDetailsDialogProps {
  refund: RefundDetails;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const getStatusBadge = (status?: string) => {
  const normalized = (status || "").toLowerCase().trim();
  if (
    normalized === "accepted" ||
    normalized === "completed" ||
    normalized === "approved"
  ) {
    return {
      variant: "success" as const,
      icon: CheckCircle2,
      label: status || "Accepted",
    };
  }
  if (normalized === "pending" || normalized === "inprogress") {
    return {
      variant: "pending" as const,
      icon: Clock3,
      label: status || "Pending",
    };
  }
  if (normalized === "rejected" || normalized === "closed") {
    return {
      variant: "closed" as const,
      icon: AlertCircle,
      label: status || "Rejected",
    };
  }
  return {
    variant: "pending" as const,
    icon: Clock3,
    label: status || "Pending",
  };
};

const RefundDetailsDialog = ({
  refund,
  trigger,
  open,
  onOpenChange,
}: RefundDetailsDialogProps) => {
  const [copied, setCopied] = useState(false);

  const statusInfo = getStatusBadge(refund.status);
  const StatusIcon = statusInfo.icon;

  const handleCopyOrderId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!refund.orderId) return;
    navigator.clipboard.writeText(refund.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const imageSrc =
    typeof refund.image === "object" &&
    refund.image !== null &&
    "src" in refund.image
      ? (refund.image as { src: string }).src
      : typeof refund.image === "string"
        ? refund.image
        : "";

  const customerImageSrc =
    refund.customer &&
    typeof refund.customer.image === "object" &&
    refund.customer.image !== null &&
    "src" in refund.customer.image
      ? (refund.customer.image as { src: string }).src
      : typeof refund.customer?.image === "string"
        ? refund.customer.image
        : "";

  const requestDateValue = refund.RequestDate || refund.OrderDate || "N/A";
  const refundDateValue = refund.refundDate || "Not processed yet";
  const displayProductName =
    refund.productName && refund.productName !== refund.orderId
      ? refund.productName
      : `Order #${refund.orderId.replace(/^#/, "")}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-lg border-border/80 bg-background/80 px-2.5 text-xs font-medium text-foreground/80 shadow-2xs transition-all hover:bg-muted hover:text-foreground focus-visible:ring-2"
          >
            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
            <span>View Details</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg md:max-w-xl gap-5 rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xl">
        {/* Header */}
        <DialogHeader className="gap-1 border-b border-border/60 pb-4">
          <div className="flex items-center justify-between pr-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                  Refund Details
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Complete overview of the refund request and status
                </DialogDescription>
              </div>
            </div>
            <Badge
              variant={statusInfo.variant}
              className="gap-1 px-2.5 py-0.5 text-xs font-semibold"
            >
              <StatusIcon className="h-3.5 w-3.5" />
              <span>{statusInfo.label}</span>
            </Badge>
          </div>
        </DialogHeader>

        {/* Hero Spotlight Card */}
        <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/30 p-4 transition-colors sm:flex-row sm:items-center">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-background p-2 shadow-xs">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={displayProductName}
                width={88}
                height={88}
                unoptimized
                className="h-full w-full object-contain"
              />
            ) : (
              <Package className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Order ID
                </span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="group inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  title="Click to copy order ID"
                >
                  <span>{refund.orderId}</span>
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <Copy className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
                  )}
                </button>
              </div>

              <h3 className="truncate text-base font-semibold text-foreground">
                {displayProductName}
              </h3>
            </div>

            <div className="flex items-center justify-between border-t border-border/50 pt-2">
              <span className="text-xs font-medium text-muted-foreground">
                Refund Amount
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                $
                {typeof refund.refundAmount === "number"
                  ? refund.refundAmount.toFixed(2)
                  : "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-3">
          {/* Reason */}
          <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>Refund Reason</span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-foreground leading-relaxed">
              {refund.refundReason || "Standard return & refund request"}
            </p>
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground">
                  Request Date
                </p>
                <p className="truncate text-xs sm:text-sm font-semibold text-foreground">
                  {requestDateValue}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock3 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground">
                  Refund Date
                </p>
                <p className="truncate text-xs sm:text-sm font-semibold text-foreground">
                  {refundDateValue}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info (if available) */}
          {refund.customer && (
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="flex items-center gap-3 min-w-0">
                {customerImageSrc ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/80 bg-background">
                    <Image
                      src={customerImageSrc}
                      alt={refund.customer.name}
                      width={40}
                      height={40}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {refund.customer.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {refund.customer.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {refund.customer.email}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-md border border-border/50 bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                Customer
              </span>
            </div>
          )}

          {/* Identifiers (Return ID / Item ID) */}
          {(refund.ReturnRequestID || refund.itemID) && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
              {refund.ReturnRequestID && (
                <span className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-muted/30 px-2 py-0.5 font-mono text-[11px]">
                  <span className="font-semibold text-foreground/70">
                    Return ID:
                  </span>
                  {refund.ReturnRequestID}
                </span>
              )}
              {refund.itemID && (
                <span className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-muted/30 px-2 py-0.5 font-mono text-[11px]">
                  <span className="font-semibold text-foreground/70">
                    Item ID:
                  </span>
                  {refund.itemID}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="mt-2 flex-row items-center justify-between border-t border-border/60 pt-3 sm:justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Secure refund transaction</span>
          </div>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg px-4 text-xs font-medium hover:bg-muted"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RefundDetailsDialog;
