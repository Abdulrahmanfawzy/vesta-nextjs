"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
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

  // Action dropdown
  columnHelper.accessor("Action", {
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       
        //       <span className="sr-only">Open menu</span>
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>

        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem >
        //       <RefundDetailsDialog
        //         refund={{
        //           ...record,
        //           productName: record.orderId,
        //           refundAmount: 100, 
        //           refundReason:"return refund",
        //           refundDate: "2022-01-01",
        //           RequestDate: record.RequestDate,
        //           image: record.image,
        //         }}
        //       />
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>

        <RefundDetailsDialog
                refund={{
                  ...record,
                  productName: record.orderId,
                  refundAmount: 100, 
                  refundReason:"return refund",
                  refundDate: "2022-01-01",
                  RequestDate: record.RequestDate,
                  image: record.image,
                }}
              />
      );
    },
  }),
]);
