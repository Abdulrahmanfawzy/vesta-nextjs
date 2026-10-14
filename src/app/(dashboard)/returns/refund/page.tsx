import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Refunds",
  description: "Track and process customer refund transactions, settlement status, and financial payouts.",
};
import ButtonsSearch from "@/components/shared/DataTable/ButtonsSearch";
import { DataTable } from "@/components/shared/DataTable/data-table";
import { SelectFilter } from "@/components/shared/DataTable/SelectFilter";
import { RefundStats } from "@/features/refund/components/RefundCards";
import { refundColumns } from "@/features/refund/components/RefundColumns";
import TabReturn from "@/features/returns/components/TabsReturn";
import { GetRefundData } from "@/api/refund.api";
import { dataCount, RefundCounts } from "@/features/refund/types/types";

export type { dataCount };

const Refund = async({searchParams}: {searchParams: Promise<{status?: string}>}) => {
  const params = await searchParams;
  const data = await GetRefundData();
  const counts: RefundCounts | undefined = data?.counts;
  
  // console.log(data);
  // console.log(params);
  return (
    <div className="flex flex-col gap-4 container mx-auto px-3 sm:px-6 py-2 sm:py-4">
      <DashboardHeader pageName="Refunds" />
      <TabReturn />
      <RefundStats data={counts} />
      <div className="w-full flex justify-end">
        <SelectFilter />
      </div>
      <ButtonsSearch />
      <DataTable columns={refundColumns} data={data?.data ?? []} />
    </div>
  );
};
export default Refund;
