import { GetReturnsData } from "@/api/return.api";
import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Returns",
  description:
    "Manage, review, and track customer return requests and order statuses.",
};
import { DataTable } from "@/components/shared/DataTable/data-table";
import { SelectFilter } from "@/components/shared/DataTable/SelectFilter";
import { columns, ReturnRequest } from "@/features/returns/components/Columns";
import TabReturn from "@/features/returns/components/TabsReturn";

type ReturnPageProps = {
  searchParams: Promise<{
    status?: string;
    page?: string;
    per_page?: string;
  }>;
};

const ReturnPage = async ({ searchParams }: ReturnPageProps) => {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page ?? 1) || 1);
  const perPage = Math.max(1, Number(params.per_page ?? 10) || 10);
  const statusParam =
    !params.status || params.status === "all" ? "" : params.status;

  let rawData = null;
  try {
    rawData = await GetReturnsData(statusParam, currentPage, perPage);
  } catch (error) {
    console.error("[ReturnPage] Failed to fetch return data:", error);
  }

  // Extract items defensively
  const items: ReturnRequest[] = Array.isArray(rawData?.data?.items)
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
      <DashboardHeader pageName="Returns" />
      <TabReturn />
      <div className="w-full flex justify-end">
        <SelectFilter />
      </div>

      <DataTable
        columns={columns}
        data={items}
        totalPages={totalPages}
        totalRows={totalRows}
      />
    </div>
  );
};

export default ReturnPage;

