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
import { cn } from "@/lib/utils";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data?: TData[];
  totalPages?: number;
  totalRows?: number;
}

export function DataTable<TData extends RowData>({
  columns,
  data = [],
  totalPages = 1,
  totalRows,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
  const perPage = Math.max(1, Number(searchParams.get("per_page") ?? 10) || 10);

  const safeData = React.useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const table = useTable({
    features,
    data: safeData,
    columns,
    onSortingChange: setSorting,
    state: { sorting },
  });

  const rows = table.getRowModel().rows;

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, rows.length]);

  return (
    <div className="w-full space-y-4">
      {/* Table Frame with ambient shadow and rounded borders */}
      <div className="relative w-full rounded-2xl border border-border/80 bg-card shadow-xs">
        {/* Subtle scroll cues on left/right edges */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-card via-card/70 to-transparent z-20 rounded-l-2xl transition-opacity duration-300" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-card via-card/70 to-transparent z-20 rounded-r-2xl transition-opacity duration-300" />
        )}

        {/* Dedicated Modern Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto custom-table-scrollbar rounded-2xl scroll-smooth"
        >
          <Table className="w-full min-w-[760px] text-sm">
            <TableHeader className="bg-muted/40 border-b border-border/70 sticky top-0 z-10 backdrop-blur-xs">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-border/70 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-11 sm:h-12 px-4 sm:px-5 py-3 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-muted-foreground/80 whitespace-nowrap text-left"
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
                rows.map((row, idx) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "border-b border-border/40 transition-colors duration-150 hover:bg-muted/35 data-[state=selected]:bg-muted/50 last:border-0",
                      idx % 2 === 1 && "bg-muted/10"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 sm:px-5 py-3.5 text-xs sm:text-sm text-foreground align-middle whitespace-nowrap"
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
                    className="h-52 text-center py-12"
                  >
                    <div className="flex flex-col items-center justify-center gap-2.5 text-muted-foreground">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 border border-border/70 shadow-2xs">
                        <PackageOpen className="h-6 w-6 text-muted-foreground/70" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        No records found
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm">
                        No items matching your current filters or query. Try selecting another status or adjusting your filters.
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
          totalRows={totalRows ?? safeData.length}
          perPage={perPage}
        />
      </Suspense>
    </div>
  );
}
