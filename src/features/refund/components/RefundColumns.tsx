"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "../../returns/components/data-table-features";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import { type RefundOrder } from "@/features/refund/types/types";
import RefundDetailsDialog from "@/features/refund/components/RefundDialog";

// Column definitions for the Refund page
// Uses RefundOrder from RefundState.ts — includes customer object (name, email, image)
const columnHelper = createColumnHelper<DataTableFeatures, RefundOrder>();

export const refundColumns = columnHelper.columns([
  // Customer avatar + name + email
  columnHelper.accessor("order_id", {
    header: "Order ID",
  }),
  columnHelper.accessor("order_date", {
    header: "Order Date",
  }),
  columnHelper.accessor("customer", {
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={
              typeof customer.avatar_url === "string"
                ? customer.avatar_url
                : (customer.avatar_url as { src: string }).src
            }
            alt={customer.name}
            width={40}
            height={40}
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("refund_reason", {
    header: "Refund Reason",
    cell: ({ row }) => (
      <span>{row.original.refund_reason || "No reason provided"}</span>
    ),
  }),

  columnHelper.accessor("refund_amount", {
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">
        ${row.original.refund_amount.toFixed(2)}
      </span>
    ),
  }),

  // Status badge
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "completed"
          ? "completed"
          : status === "Pending"
            ? "pending"
            : "closed"; // Rejected → closed
      return <Badge variant={variant}>{status}</Badge>;
    },
  }),
  //RefundDate
  columnHelper.accessor("refund_date", {
    header: "Refund Date",
  }),

  // Action column with modernized RefundDetailsDialog
  columnHelper.accessor("action", {
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <RefundDetailsDialog
          refund={{
            ...record,
            productName: `Order ${record.order_id}`,
            refundAmount: record.refund_amount,
            refundReason: record.refund_reason,
            refundDate: record.refund_date,
            RequestDate: record.order_date,
            image: record.customer.avatar_url,
            customer: record.customer,
          }}
        />
      );
    },
  }),
]);
