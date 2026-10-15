"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ReturnRequest, ReturnStatus } from "../types/types";
import DialogReturns from "./DialogReturns";

export type { ReturnRequest };

const columnHelper = createColumnHelper<DataTableFeatures, ReturnRequest>();

export const columns = columnHelper.columns([
  // Product image
  columnHelper.accessor((row) => row.items?.[0]?.product_image_url ?? "", {
    id: "image",
    header: "Product Image",
    cell: ({ getValue }) => {
      const image = getValue();
      return (
        <div className="flex items-center justify-center">
          {image ? (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border/70 bg-muted/40 shadow-2xs">
              <Image
                src={image}
                alt="Order item"
                width={44}
                height={44}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-medium text-muted-foreground">
              N/A
            </div>
          )}
        </div>
      );
    },
  }),

  // Return request ID
  columnHelper.accessor("rma_no", {
    header: "Return Request ID",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs font-semibold text-foreground/90">
        {getValue() || "-"}
      </span>
    ),
  }),

  // Order ID
  columnHelper.accessor("order_id", {
    header: "Order ID",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-muted-foreground">
        #{getValue() || "-"}
      </span>
    ),
  }),

  // Item ID
  columnHelper.accessor(
    (row) =>
      row.items?.[0]?.order_item_id
        ? String(row.items[0].order_item_id)
        : "-",
    {
      id: "itemID",
      header: "Item ID",
      cell: ({ getValue }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {getValue()}
        </span>
      ),
    },
  ),

  // Request date
  columnHelper.accessor("created_at", {
    header: "Request Date",
    cell: ({ getValue }) => {
      const date = getValue();
      return (
        <span className="text-xs text-muted-foreground">
          {date ? new Date(date).toLocaleDateString("en-GB") : "-"}
        </span>
      );
    },
  }),

  // Status
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();

      const config: Record<
        ReturnStatus,
        { label: string; variant: "refunded" | "approved" | "pending" | "rejected"| "inprogress"| "closed"}
      > = {
        refunded: {
          label: "refunded",
          variant: "approved",
        },
        approved:{
          label: "approved",
          variant: "approved",
        },in_transit:{
          label: "in_transit",
          variant: "approved",
        },  cancelled:{
          label: "cancelled",
          variant: "rejected",
        },

        pending: {
          label: "pending",
          variant: "pending",
        },
        rejected: {
          label: "Rejected",
          variant: "closed",
        },
      };

      const currentStatus = config[status] ?? {
        label: status || "Unknown",
        variant: "pending" as const,
      };

      return (
        <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
      );
    },
  }),

  // Action
  columnHelper.display({
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      const item = record.items?.[0];

      return (
        <DialogReturns
          refund={{
            id: String(record.id),
            image: item?.product_image_url ?? "",
            ReturnRequestID: record.rma_no,
            orderId: String(record.order_id),
            order_id: record.order_id,
            itemID: String(item?.order_item_id ?? ""),
            RequestDate: record.created_at,
            status:
              record.status === "refunded"
                ? "refunded"
                : record.status === "pending"
                  ? "Pending"
                  : "Rejected",
            Action: "View Details",
            productName: item?.product_id
              ? `Product #${item.product_id}`
              : "N/A",
            refundAmount:
              Number(item?.unit_price ?? 0) * (item?.quantity ?? 1),
            refundReason: record.reason_text,
            refundDate: record.created_at,
            reasonCode: record.reason_code,
            quantity: item?.quantity ?? 0,
          }}
        />
      );
    },
  }),
]);
