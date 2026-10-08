"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "../../returns/components/data-table-features";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type RefundOrder } from "@/features/refund/types/types";
import RefundDetailsDialog from "@/features/refund/components/RefundDialog";

// Column definitions for the Refund page
// Uses RefundOrder from RefundState.ts — includes customer object (name, email, image)
const columnHelper = createColumnHelper<DataTableFeatures, RefundOrder>();

export const refundColumns = columnHelper.columns([
  // Customer avatar + name + email
  columnHelper.accessor("orderId", {
    header: "Order ID",
  }),
  columnHelper.accessor("OrderDate", {
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
              typeof customer.image === "string"
                ? customer.image
                : (customer.image as { src: string }).src
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

  columnHelper.accessor("refundReason", {
    header: "Refund Reason",
  }),

  columnHelper.accessor("refundAmount", {
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">
        ${row.original.refundAmount.toFixed(2)}
      </span>
    ),
  }),

  // Status badge
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "Accepted"
          ? "success"
          : status === "Pending"
            ? "pending"
            : "closed"; // Rejected → closed
      return <Badge variant={variant}>{status}</Badge>;
    },
  }),
  //RefundDate
  columnHelper.accessor("refundDate", {
    header: "Refund Date",
  }),

  // Action dropdown
  columnHelper.accessor("Action", {
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <RefundDetailsDialog
                refund={{
                  ...record,
                  productName: record.orderId,
                  refundAmount: 100, 
                  refundReason:"return refund",
                  refundDate: "2022-01-01",
                  RequestDate: record.OrderDate,
                  image: (record.customer.image as string),
                }}
              />
      );
    },
  }),
]);
