"use client";

import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import * as React from "react";
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
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "../../../features/returns/components/DataTablePagination";
import { useSearchParams } from "next/navigation";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
}

export const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
  { label: "Accepted", value: "accepted" },
] as const;

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  console.log(status);

  const table = useTable({
    features,
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-10 mt-5">
      <div className="w-full overflow-x-auto rounded-md ">
        <Table className="w-full text-sm  ">
          <TableHeader
            className="   
        relative z-10 bg-app-info-light
        [&_th:first-child]:rounded-l-md
        [&_th:last-child]:rounded-r-md
        [&_th]:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.12)]
       "
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="h-9 border-gray-300">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-18 px-3 py-0 text-lg  font-semibold whitespace-nowrap text-center"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="border-r border-l border-b border-t-0 border-gray-300 shadow-lg">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.getValue() === "Accepted"
                          ? " text-app-success px-3 py-1.5 border-0 text-center w-fit - text-base"
                          : "  px-3 py-1.5 border-0 text-center text-app-primary text-base"
                      }
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
                  className="h-16 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
