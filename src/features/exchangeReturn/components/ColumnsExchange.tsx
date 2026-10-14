"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "../../returns/components/data-table-features";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import RefundDetailsDialog from "@/features/refund/components/RefundDialog";
import { ExchangeType } from "../types/types.Exchange";
import ExchangeDialog from "./ExchangeDialog";

// Column definitions for the Refund page
// Uses RefundOrder from RefundState.ts — includes customer object (name, email, image)
const columnHelper = createColumnHelper<DataTableFeatures, ExchangeType>();

export const ExchangeColumns = columnHelper.columns([
  // Customer avatar + name + email
  columnHelper.accessor("id", {
    header: "Exchange ID",
  }),
  columnHelper.accessor("order_id", {
    header: "Order ID",
  }),
  columnHelper.accessor("product_delivered", {
    header: "Product Delivered",
  }),
  columnHelper.accessor("requested_product", {
    header: "Requested Product",
  }),
  columnHelper.accessor("buyer", {
    header: "Buyer",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={customer.photos[0]}
            alt={customer.requested_product}
            width={40}
            height={40}
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="font-medium">{customer.requested_product}</p>
            <p className="text-sm text-gray-500">{customer.buyer}</p>
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("exchange_reason", {
    header: "Exchange Reason",
  }),

  columnHelper.accessor("price_difference", {
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">${row.original.price_difference}</span>
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
          : status === "pending"
            ? "pending"
            : "closed"; // Rejected → closed
      return <Badge variant={variant}>{status}</Badge>;
    },
  }),
  //RefundDate
  //   columnHelper.accessor("refundDate", {
  //     header: "Refund Date",
  //   }),

  // Action column with modernized RefundDetailsDialog
  columnHelper.accessor("Action", {
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <ExchangeDialog
          refund={{
            ...record,
            productName: `Order ${record.order_id}`,
            refundReason: record.exchange_reason,
            status: record.status,
            // refundDate: record.refundDate,
            RequestDate: record.order_id,
            photos: record.photos[0],
            customer: {
              name: record.product_delivered || "Unknown",
              email: "",
              photos: record.photos[0],
            },
          }}
        />
      );
    },
  }),
]);
