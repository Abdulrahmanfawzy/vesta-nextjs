import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ButtonsSearch from "@/components/shared/DataTable/ButtonsSearch";
import { DataTable } from "@/components/shared/DataTable/data-table";
import TabReturn from "@/features/returns/components/TabsReturn";
import { ExchangeColumns } from "@/features/exchangeReturn/components/ColumnsExchange";
import { GetExchangeData } from "@/api/return.api";
import { ExchangeType } from "@/features/exchangeReturn/types/types.Exchange";

export const metadata: Metadata = {
  title: "Exchange Requests",
  description:
    "View and manage item exchange requests, replacement shipments, and customer options.",
};

type ExchangeReturnPageProps = {
  searchParams: Promise<{ status?: string; page?: string; per_page?: string }>;
};

const ExchangeReturnPage = async ({
  searchParams,
}: ExchangeReturnPageProps) => {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page ?? 1) || 1);
  const perPage = Math.max(1, Number(params.per_page ?? 10) || 10);
  const statusParam =
    !params.status || params.status === "all" ? "" : params.status;

  let rawData = null;
  try {
    rawData = await GetExchangeData(statusParam, currentPage, perPage);
  } catch (error) {
    console.error("[ExchangeReturnPage] Failed to fetch exchange data:", error);
  }

  // Extract items defensively
  const items: ExchangeType[] = Array.isArray(rawData?.data?.items)
    ? rawData.data.items
    : Array.isArray(rawData?.data)
      ? rawData.data
      : Array.isArray(rawData?.items)
        ? rawData.items
        : Array.isArray(rawData)
          ? rawData
          : [];

  // Extract pagination info from any standard API envelope
  const paginationSrc =
    rawData?.pagination ??
    rawData?.meta ??
    rawData?.data?.pagination ??
    rawData?.data?.meta ??
    rawData;

  const totalRows =
    Number(
      paginationSrc?.total ??
        paginationSrc?.total_count ??
        paginationSrc?.count ??
        rawData?.total ??
        rawData?.data?.total ??
        items.length
    ) || 0;

  const totalPages = Math.max(
    1,
    Number(
      paginationSrc?.total_pages ??
        paginationSrc?.last_page ??
        rawData?.total_pages ??
        rawData?.last_page ??
        rawData?.data?.total_pages ??
        (totalRows > 0 ? Math.ceil(totalRows / perPage) : 1)
    ) || 1
  );

  return (
    <div className="flex flex-col gap-4 container mx-auto px-3 sm:px-6 py-2 sm:py-4">
      <DashboardHeader pageName="Exchange Requests" />
      <TabReturn />
      <div className="my-3 sm:my-4">
        <ButtonsSearch />
      </div>
      <DataTable
        columns={ExchangeColumns}
        totalPages={totalPages}
        totalRows={totalRows}
        data={items}
      />
    </div>
  );
};

export default ExchangeReturnPage;

