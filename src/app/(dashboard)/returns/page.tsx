import { GetReturnsData } from "@/api/return.api";
import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Returns",
  description: "Manage, review, and track customer return requests and order statuses.",
};
import { DataTable } from "@/components/shared/DataTable/data-table";
import { SelectFilter } from "@/components/shared/DataTable/SelectFilter";
import { columns, ReturnRequest } from "@/features/returns/components/Columns";
import TabReturn from "@/features/returns/components/TabsReturn";

type ReturnParm = {
  searchParams: Promise<{
    status?: "string" | "";
  }>;
};
const ReturnPage = async ({ searchParams }: ReturnParm) => {
  const param = await searchParams;
  console.log(param);

  const data = await GetReturnsData(param.status || "");

  return (
    <div className="flex flex-col gap-4 container mx-auto px-3 sm:px-6 py-2 sm:py-4">
      <DashboardHeader pageName="Returns" />
      <TabReturn />
      <div className="w-full flex justify-end">
        <SelectFilter />
      </div>

      <DataTable<ReturnRequest> columns={columns} data={data?.data.items} />
    </div>
  );
};

export default ReturnPage;
