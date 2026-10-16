"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/features/returns/components/data-table-features";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ExchangeType } from "../types/types.Exchange";
import ExchangeDialog from "./ExchangeDialog";

const columnHelper = createColumnHelper<DataTableFeatures, ExchangeType>();

export const ExchangeColumns = columnHelper.columns([
  columnHelper.accessor((row) => row.exchange_id ?? row.id, {
    id: "exchange_id",
    header: "Exchange ID",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs font-semibold text-foreground/90">
        #{getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("order_id", {
    header: "Order ID",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-muted-foreground">
        #{getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("product_delivered", {
    header: "Product Delivered",
    cell: ({ getValue }) => (
      <span className="font-medium text-xs sm:text-sm text-foreground">
        {getValue() || "-"}
      </span>
    ),
  }),

  columnHelper.accessor("requested_product", {
    header: "Requested Product",
    cell: ({ getValue }) => (
      <span className="font-medium text-xs sm:text-sm text-foreground">
        {getValue() || "-"}
      </span>
    ),
  }),

  columnHelper.accessor("stock_availability", {
    header: "Stock Availability",
    cell: ({ getValue }) => {
      const stock = getValue();
      const isAvailable =
        stock?.toLowerCase().includes("in") ||
        stock?.toLowerCase().includes("avail") ||
        stock?.toLowerCase() === "yes";

      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isAvailable
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isAvailable ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {stock || "Unknown"}
        </span>
      );
    },
  }),

  columnHelper.accessor("buyer", {
    header: "Buyer",
    cell: ({ row }) => {
      const buyer = row.original.buyer;
      const photo = row.original.photos?.[0];

      return (
        <div className="flex items-center gap-3">
          {photo ? (
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-border/70 bg-muted/40 shadow-2xs">
              <Image
                src={photo}
                alt={buyer?.name || "Buyer"}
                width={36}
                height={36}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              {(buyer?.name || "U").slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 max-w-37.5">
            <p className="truncate text-xs font-semibold text-foreground">
              {buyer?.name || "Customer"}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {buyer?.email || "-"}
            </p>
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("exchange_reason", {
    header: "Exchange Reason",
    cell: ({ getValue }) => (
      <span
        className="text-xs text-muted-foreground max-w-45 truncate block"
        title={getValue() || ""}
      >
        {getValue() || "Standard exchange"}
      </span>
    ),
  }),

  columnHelper.accessor("price_difference", {
    header: "Amount",
    cell: ({ row }) => {
      const diff = row.original.price_difference;
      const num = typeof diff === "number" ? diff : parseFloat(String(diff || "0"));
      return (
        <span className="font-semibold text-xs text-foreground">
          {isNaN(num) ? diff || "$0.00" : `$${Math.abs(num).toFixed(2)}`}
        </span>
      );
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "pending";
      const normalized = status.toLowerCase();

      const variant =
        normalized === "completed" || normalized === "approved"
          ? "completed"
          : normalized === "pending" || normalized === "inprogress"
            ? "pending"
            : "closed";

      return (
        <Badge variant={variant} className="capitalize text-xs font-medium">
          {status}
        </Badge>
      );
    },
  }),

  columnHelper.display({
    id: "Action",
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <ExchangeDialog
          refund={{
            id: record.id,
            order_id: record.order_id,
            order_date: record.created_at || "N/A",
            customer: {
              id: 0,
              name: record.buyer?.name || "Customer",
              email: record.buyer?.email || "",
              avatar_url: record.photos?.[0] || "",
            },
            refund_reason: record.exchange_reason || "",
            refund_amount:
              typeof record.price_difference === "number"
                ? record.price_difference
                : parseFloat(String(record.price_difference || 0)) || 0,
            status: record.status || "pending",
            refund_date: "",
            action: null,
            productName: record.requested_product || `Order #${record.order_id}`,
            photos: record.photos?.[0] || "",
          } as any}
        />
      );
    },
  }),
]);

