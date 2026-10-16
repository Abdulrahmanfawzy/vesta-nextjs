"use client";

import * as React from "react";
import { Suspense } from "react";
import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  features,
  type DataTableFeatures,
} from "@/features/returns/components/data-table-features";
import { ServerPagination } from "@/components/shared/DataTable/ServerPagination";
import { useSearchParams } from "next/navigation";
import { PackageOpen } from "lucide-react";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  totalPages?: number;
  totalRows?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  totalPages = 1,
  totalRows,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
  const perPage = Math.max(1, Number(searchParams.get("per_page") ?? 10) || 10);

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      ...(pageSize !== undefined
        ? { pagination: { pageIndex: 0, pageSize } }
        : {}),
    },
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="w-full space-y-4">
      <div className="w-full rounded-2xl border border-border/70 bg-card shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <Table className="w-full min-w-180 text-sm">
            <TableHeader className="bg-muted/40 border-b border-border/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-border/60 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-11 sm:h-12 px-4 py-3 text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground whitespace-nowrap text-left"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows.length ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-border/40 transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted/50 last:border-0"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-3 text-xs sm:text-sm text-app-primary align-middle whitespace-nowrap"
                      >
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-44 text-center py-10"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <PackageOpen className="h-9 w-9 text-muted-foreground/50 stroke-[1.5]" />
                      <p className="text-sm font-medium text-foreground">
                        No records found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        No items matching your current filters or query.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Suspense fallback={null}>
        <ServerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRows={totalRows}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange} />
      </div>
    </div>
  );
}