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
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const safeTotalPages = Math.max(1, totalPages);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= safeTotalPages;

  const goTo = (page: number) => {
    const target = Math.max(1, Math.min(page, safeTotalPages));
    updateSearchParams({ page: String(target) });
  };

  const setPerPage = (value: string) => {
    // Reset to page 1 when changing rows per page
    updateSearchParams({ per_page: value, page: "1" });
  };

  const rawStart = (currentPage - 1) * perPage + 1;
  const effectiveStart = totalRows === 0 ? 0 : Math.min(rawStart, totalRows);
  const effectiveEnd = Math.min(currentPage * perPage, totalRows);

  // Build compact page list with ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    if (safeTotalPages <= 5) {
      for (let i = 1; i <= safeTotalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(safeTotalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < safeTotalPages - 2) pages.push("ellipsis");
      pages.push(safeTotalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1.5 py-1 text-sm text-muted-foreground select-none">
      {/* Result count */}
      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-muted-foreground">
        <span>Showing</span>
        <span className="font-semibold text-foreground">
          {effectiveStart}–{effectiveEnd}
        </span>
        <span>of</span>
        <span className="font-semibold text-foreground">{totalRows}</span>
        <span>results</span>
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            Rows per page
          </span>
          <Select value={String(perPage)} onValueChange={setPerPage}>
            <SelectTrigger className="h-8 w-17 rounded-lg border-border/70 bg-background text-xs font-medium shadow-2xs hover:bg-muted/30 focus-visible:ring-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top" className="rounded-xl shadow-lg border-border/80">
              {[10, 20, 25, 50, 100].map((ps) => (
                <SelectItem key={ps} value={String(ps)} className="text-xs">
                  {ps}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <Pagination className="w-auto mx-0 justify-end">
          <PaginationContent className="gap-1">
            {/* First Page */}
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => !isFirst && goTo(1)}
                disabled={isFirst}
                className={cn(
                  "h-8 w-8 rounded-lg p-0 text-muted-foreground hover:text-foreground transition-colors",
                  isFirst ? "opacity-35 cursor-not-allowed pointer-events-none" : "cursor-pointer hover:bg-muted"
                )}
                title="First Page"
                aria-label="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isFirst) goTo(currentPage - 1);
                }}
                aria-disabled={isFirst}
                className={cn(
                  "h-8 rounded-lg px-2 text-xs transition-colors",
                  isFirst
                    ? "opacity-35 pointer-events-none cursor-not-allowed"
                    : "cursor-pointer hover:bg-muted hover:text-foreground"
                )}
              />
            </PaginationItem>

            {/* Page numbers */}
            {getPageNumbers().map((page, idx) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis className="h-8 w-8 text-xs text-muted-foreground" />
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
                    className={cn(
                      "h-8 w-8 rounded-lg text-xs font-medium transition-all cursor-pointer",
                      page === currentPage
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary hover:text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
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
                className={cn(
                  "h-8 rounded-lg px-2 text-xs transition-colors",
                  isLast
                    ? "opacity-35 pointer-events-none cursor-not-allowed"
                    : "cursor-pointer hover:bg-muted hover:text-foreground"
                )}
              />
            </PaginationItem>

            {/* Last Page */}
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => !isLast && goTo(safeTotalPages)}
                disabled={isLast}
                className={cn(
                  "h-8 w-8 rounded-lg p-0 text-muted-foreground hover:text-foreground transition-colors",
                  isLast ? "opacity-35 cursor-not-allowed pointer-events-none" : "cursor-pointer hover:bg-muted"
                )}
                title="Last Page"
                aria-label="Last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

