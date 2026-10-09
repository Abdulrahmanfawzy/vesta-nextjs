"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "../../returns/components/data-table-features";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import RefundDetailsDialog from "@/features/refund/components/RefundDialog";
import { ExchangeType } from "../types/types.Exchange";

// Column definitions for the Refund page
// Uses RefundOrder from RefundState.ts — includes customer object (name, email, image)
const columnHelper = createColumnHelper<DataTableFeatures, ExchangeType>();

export const ExchangeColumns = columnHelper.columns([
  // Customer avatar + name + email
  columnHelper.accessor("exchangeId", {
    header: "Exchange ID",
  }),
  columnHelper.accessor("orderId", {
    header: "Order ID",
  }),
  columnHelper.accessor("productDelivered", {
    header: "Product Delivered",
  }),
  columnHelper.accessor("requestedProduct", {
    header: "Requested Product",
  }),
  columnHelper.accessor("buyer", {
    header: "Buyer",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={
              typeof customer.image === "string"
                ? customer.image
                : (customer.image as { src: string }).src
            }
            alt={customer.requestedProduct}
            width={40}
            height={40}
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="font-medium">{customer.requestedProduct}</p>
            <p className="text-sm text-gray-500">{customer.buyer}</p>
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("exchangeReason", {
    header: "Exchange Reason",
  }),

  columnHelper.accessor("priceDifference", {
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">
        ${row.original.priceDifference}
      </span>
    ),
  }),

  // Status badge
  columnHelper.accessor("exchangeSettingsStatus", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.exchangeSettingsStatus;
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
//   columnHelper.accessor("refundDate", {
//     header: "Refund Date",
//   }),

  // Action column with modernized RefundDetailsDialog
  columnHelper.accessor("Action", {
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <RefundDetailsDialog
          refund={{
            ...record,
            productName: `Order ${record.orderId}`,
            refundAmount: record.priceDifference,
            refundReason: record.exchangeReason,
            // refundDate: record.refundDate,
            RequestDate: record.orderId,
            image: record.image,
            customer: {
                name: record.buyer,
                email: "",
                image: record.image,
            }
          }}
        />
      );
    },
  }),
]);
