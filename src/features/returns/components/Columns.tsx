"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import RefundDetailsDialog from "@/features/refund/components/RefundDialog";

// Shape of data from Constants.tsx → returnRequests
export type ReturnRequest = {
  id: string;
  image: string;
  ReturnRequestID: string;
  orderId: string;
  itemID: string;
  RequestDate: string;
  status: "Accepted" | "Pending" | "Rejected";
  Action: string;
};

const columnHelper = createColumnHelper<DataTableFeatures, ReturnRequest>();

export const columns = columnHelper.columns([
  // Product image
  columnHelper.accessor("image", {
    header: "Order Image",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Image
          src={row.original.image}
          alt="Order item"
          width={48}
          height={48}
          className="h-12 w-12 rounded-md object-cover"
        />
      </div>
    ),
  }),

  columnHelper.accessor("ReturnRequestID", {
    header: "Return Request ID",
  }),

  columnHelper.accessor("orderId", {
    header: "Order ID",
  }),

  columnHelper.accessor("itemID", {
    header: "Item ID",
  }),

  columnHelper.accessor("RequestDate", {
    header: "Request Date",
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

  // Action column with modern RefundDetailsDialog
  columnHelper.accessor("Action", {
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <RefundDetailsDialog
          refund={{
            ...record,
            productName: `Order ${record.orderId}`,
            refundAmount: 100,
            refundReason: "Return & Refund Request",
            refundDate: "28-05-2026",
            RequestDate: record.RequestDate,
            image: record.image,
            ReturnRequestID: record.ReturnRequestID,
            itemID: record.itemID,
          }}
        />
      );
    },
  }),
]);
