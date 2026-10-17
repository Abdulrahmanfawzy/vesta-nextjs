"use client";

import CustomTabs from "@/components/common/CustomTabs";
import { DataTable } from "@/components/shared/DataTable/data-table";
import { Badge } from "@/components/ui/badge";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import type { SupportTicket } from "@/types/support.types";
import type { DataTableFeatures } from "@/features/returns/components/data-table-features";
import type { ReactNode } from "react";

import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";


const columnHelper = createColumnHelper<DataTableFeatures, SupportTicket>();
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "Ticket ID",
    cell: ({ getValue }) => (
      <span className="text-[#658DCA]">
        TKT-{String(getValue()).padStart(6, '0')}
      </span>
    ),
  }),
  columnHelper.accessor("subject", {
    header: "Subject",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      const variant =
        status === "open" || status === "awaiting_seller"
          ? "pending"
          : status === "in_progress"
            ? "inprogress"
            : status === "resolved"
              ? "success"
              : "closed";

      return <Badge className="p-3" variant={variant}>{status.replace("_", " ")}</Badge>;
    },
  }),
  columnHelper.accessor("created_at", {
    header: "created at",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.accessor("updated_at", {
    header: "Last updated",
    cell: ({ getValue }) => formatDate(getValue()),
  }),
  columnHelper.display({
    id: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        href={`/settings/support-tickets/${row.original.id}`}
        className="flex w-full items-center justify-center"
      >
        <Eye className="w-4 h-4 text-app-neutral-dark" />
      </Link>
    ),
  }),
]);



const tabs = [
  {
    value: "all",
    label: "All",
    content: "",
  },
  {
    value: "open",
    label: "Open",
    content: "",
  },
  {
    value: "in_progress",
    label: "In Progress",
    content: "",
  },
  {
    value: "resolved",
    label: "Resolved",
    content: "",
  },
  {
    value: "closed",
    label: "Closed",
    content: "",
  },
];

export default function SupportTicketsView({ header }: { header?: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read the filters and page number from the URL.
  const status = searchParams.get("status") ?? "all";
  const parsedPage = Number(searchParams.get("page"));
  const page =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const allowedPageSizes = [10, 20, 25, 50];
  const parsedPageSize = Number(searchParams.get("per_page"));
  const perPage = allowedPageSizes.includes(parsedPageSize)
    ? parsedPageSize
    : 10;

  const params = useMemo(
    () => ({
      page,
      per_page: perPage,
      ...(status !== "all" ? { status } : {}),
    }),
    [page, perPage, status],
  );
  const { data, isPending, isError, error, isFetching } =
    useSupportTickets(params);

  const tickets = data?.data.tickets ?? [];
  const pagination = data?.data.pagination;

  // Update URL query params without navigating to another page.
  const updateQueryParams = (updates: {
    status?: string;
    page?: number;
    perPage?: number;
  }) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (updates.status !== undefined) {
      if (updates.status === "all") {
        nextParams.delete("status");
      } else {
        nextParams.set("status", updates.status);
      }

      // Start from page 1 whenever the filter changes.
      nextParams.delete("page");
    }

    if (updates.page !== undefined) {
      nextParams.set("page", String(updates.page));
    }

    if (updates.perPage !== undefined) {
      nextParams.set("per_page", String(updates.perPage));
      nextParams.delete("page");
    }

    const query = nextParams.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };



  return (
    <div className="container mx-auto flex w-full min-w-0 flex-col gap-4 px-3 py-2 sm:px-6 sm:py-4">
      {header}
      <div className="min-w-0 rounded-2xl border border-app-neutral-light p-2 shadow-xs sm:p-3">
        <CustomTabs
          tabs={tabs}
          className="mb-6 border-b border-app-neutral-light px-2 pt-3 sm:px-4 sm:pt-4"
          onValueChange={(value) => updateQueryParams({ status: value })}
        />
        {isPending ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading support tickets...
          </p>
        ) : isError ? (
          <p className="py-10 text-center text-sm text-destructive">
            {error.message || "Failed to load support tickets."}
          </p>
        ) : (
          <>
            {isFetching && (
              <p className="mb-3 text-sm text-muted-foreground">
                Updating tickets...
              </p>
            )}

            <DataTable<SupportTicket>
              columns={columns}
              data={tickets}
              // currentPage={pagination?.current_page ?? page}
              totalPages={pagination?.last_page ?? 1}
              totalRows={pagination?.total ?? 0}
              // pageSize={pagination?.per_page ?? perPage}
              // onPageChange={(nextPage) =>
              //   updateQueryParams({ page: nextPage })
              // }
              // onPageSizeChange={(nextPageSize) =>
              //   updateQueryParams({ perPage: nextPageSize })
              // }
            />
          </>
        )}
      </div>
    </div>
  );
}
