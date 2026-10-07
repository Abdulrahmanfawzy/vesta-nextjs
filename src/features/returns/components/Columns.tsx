"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { returnRequests } from "@/features/returns/constants/Constants";
import { type DataTableFeatures } from "./data-table-features";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReturnRequest = {
  id: string;
  ReturnRequestID: string;
  orderId: string;
  itemID: string;
  RequestDate: string;
  status: "Accepted" | "Pending" | "Rejected";
  Action: string;
  image: string;
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, ReturnRequest>();

export const columns = columnHelper.columns([
   columnHelper.accessor("image", {
    header: "Image",
    cell: ({ row }) => {
      return <img src={row.original.image} alt="" width={80} height={80} />;
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
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
  columnHelper.accessor("Action", {
    header: "Action",
    cell: ({ row }) => {
      const returnRequests = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(returnRequests.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),

 
]);
