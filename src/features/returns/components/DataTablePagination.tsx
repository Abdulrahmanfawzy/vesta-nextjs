import { type ReactTable, type RowData } from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type DataTableFeatures } from "./data-table-features";

interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
}

export function DataTablePagination<TData extends RowData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.state.pagination?.pageIndex ?? 0;
  const pageSize = table.state.pagination?.pageSize ?? 10;
  const pageCount = Math.max(1, table.getPageCount());
  const totalRows = table.getFilteredRowModel().rows.length;

  // Build compact page number list with ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    if (pageCount <= 5) {
      for (let i = 0; i < pageCount; i++) pages.push(i);
    } else {
      pages.push(0);
      if (pageIndex > 2) pages.push("ellipsis");
      const start = Math.max(1, pageIndex - 1);
      const end = Math.min(pageCount - 2, pageIndex + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (pageIndex < pageCount - 3) pages.push("ellipsis");
      pages.push(pageCount - 1);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1 py-1 text-sm text-muted-foreground">
      {/* Result count */}
      <p className="text-xs text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-foreground">
          {totalRows === 0 ? 0 : pageIndex * pageSize + 1}
        </span>
        {" – "}
        <span className="font-medium text-foreground">
          {Math.min((pageIndex + 1) * pageSize, totalRows)}
        </span>
        {" of "}
        <span className="font-medium text-foreground">{totalRows}</span>{" "}
        results
      </p>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs whitespace-nowrap">Rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(val) => {
              table.setPageSize(Number(val));
            }}
          >
            <SelectTrigger className="h-7 w-16 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 50].map((ps) => (
                <SelectItem key={ps} value={`${ps}`} className="text-xs">
                  {ps}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Shadcn Pagination */}
        <Pagination className="w-auto mx-0 justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.previousPage();
                }}
                aria-disabled={!table.getCanPreviousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {getPageNumbers().map((page, idx) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageIndex}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(page);
                    }}
                    className="h-8 w-8 text-xs"
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.nextPage();
                }}
                aria-disabled={!table.getCanNextPage()}
                className={
                  !table.getCanNextPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
