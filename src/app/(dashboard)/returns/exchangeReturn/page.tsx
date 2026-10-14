import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Exchange Requests",
  description: "View and manage item exchange requests, replacement shipments, and customer options.",
};
import ButtonsSearch from "@/components/shared/DataTable/ButtonsSearch";
import { DataTable } from "@/components/shared/DataTable/data-table";
import TabReturn from "@/features/returns/components/TabsReturn";
import { ExchangeColumns } from "@/features/exchangeReturn/components/ColumnsExchange";
import { GetExchangeData } from "@/api/return.api";
const ExchangeReturnPage = async () => {
  const data = await GetExchangeData()
  console.log(data);
  
  return (
    <div className="flex flex-col gap-4 container mx-auto px-3 sm:px-6 py-2 sm:py-4">
      <DashboardHeader pageName="Exchange Requests" />
      <TabReturn />
      <div className="my-6" >
        <ButtonsSearch  />
      </div>
      <DataTable columns={ExchangeColumns} data={data?.data} />
    </div>

  );
};

export default ExchangeReturnPage;
