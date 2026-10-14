import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Refunds",
  description: "Track and process customer refund transactions, settlement status, and financial payouts.",
};
import ButtonsSearch from "@/components/shared/DataTable/ButtonsSearch";
import { DataTable } from "@/components/shared/DataTable/data-table";
import { SelectFilter } from "@/components/shared/DataTable/SelectFilter";
import { ServerPagination } from "@/components/shared/DataTable/ServerPagination";
import { RefundStats } from "@/features/refund/components/RefundCards";
import { refundColumns } from "@/features/refund/components/RefundColumns";
import TabReturn from "@/features/returns/components/TabsReturn";
import { GetRefundData } from "@/api/refund.api";
import { dataCount, RefundCounts } from "@/features/refund/types/types";
import { ReturnsFilters } from "@/features/refund/components/SearchbyDate";
import { Suspense } from "react";

export type { dataCount };

type RefundSearchParams = {
  status?: string;
  reason?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
  page?: string;
  per_page?: string;
};

const Refund = async ({ searchParams }: { searchParams: Promise<RefundSearchParams> }) => {
  const params = await searchParams;

const currentPage = Math.max(1, Number(params.page ?? 1) || 1);
const perPage = Math.max(1, Number(params.per_page ?? 10) || 10);
  const data = await GetRefundData(
    params.status    ?? "",
    params.reason    ?? "",
    perPage,
    currentPage,
    params.search    ?? "",
    params.date_from ?? "",
    params.date_to   ?? ""
  );

  const counts: RefundCounts | undefined = data?.counts;
  // Resolve pagination from whichever envelope the API uses
  const src = data?.pagination ?? data?.meta ?? data;
  const totalPages = src?.total_pages ?? src?.last_page ?? 1;
  const totalRows = src?.total ?? src?.count ?? data?.data?.length ?? 0;


  return (
    <div className="flex flex-col gap-4 container mx-auto px-3 sm:px-6 py-2 sm:py-4">
      <DashboardHeader pageName="Refunds" />
      <TabReturn />
      <RefundStats data={counts} />

      {/* Filters row: status select (left) + reason / date-range / search (right) */}
      <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SelectFilter />
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading filters…</p>}>
          <ReturnsFilters />
        </Suspense>
      </div>

      <ButtonsSearch />
      <DataTable
        columns={refundColumns}
        data={data?.data ?? []}
        totalPages={totalPages}
        totalRows={totalRows}
      />

      {/* URL-driven pagination — updates ?page and ?per_page, server re-fetches */}

    </div>
  );
};
export default Refund;
