"use client";

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
import { useUpdateSearchParams } from "@/features/refund/hooks/UpdateSearchParam";

interface ServerPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  perPage: number;
}

export function ServerPagination({
  currentPage,
  totalPages,
  totalRows,
  perPage,
}: ServerPaginationProps) {
  const { updateSearchParams } = useUpdateSearchParams();

  const goTo = (page: number) => {
    updateSearchParams({ page: String(page) });
  };

  const setPerPage = (value: string) => {
    // Reset to page 1 when changing rows per page
    updateSearchParams({ per_page: value, page: "1" });
  };

  const startRow = totalRows === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRow = Math.min(currentPage * perPage, totalRows);

  // Build compact page list with ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1 py-1 text-sm text-muted-foreground">
      {/* Result count */}
      <p className="text-xs text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-foreground">{startRow}</span>
        {" – "}
        <span className="font-medium text-foreground">{endRow}</span>
        {" of "}
        <span className="font-medium text-foreground">{totalRows}</span>{" "}
        results
      </p>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs whitespace-nowrap">Rows per page</span>
          <Select value={String(perPage)} onValueChange={setPerPage}>
            <SelectTrigger className="h-7 w-16 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 50].map((ps) => (
                <SelectItem key={ps} value={String(ps)} className="text-xs">
                  {ps}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <Pagination className="w-auto mx-0 justify-end">
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isFirst) goTo(currentPage - 1);
                }}
                aria-disabled={isFirst}
                className={isFirst ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Page numbers */}
            {getPageNumbers().map((page, idx) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(page);
                    }}
                    className="h-8 w-8 text-xs"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLast) goTo(currentPage + 1);
                }}
                aria-disabled={isLast}
                className={isLast ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
