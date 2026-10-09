import DashboardHeader from "@/components/layout/DashboardHeader";
import ButtonsSearch from "@/components/shared/DataTable/ButtonsSearch";
import { DataTable } from "@/components/shared/DataTable/data-table";
import TabReturn from "@/features/returns/components/TabsReturn";
import { ExchangeColumns } from "@/features/exchangeReturn/components/ColumnsExchange";
import { DataExchange } from "@/features/exchangeReturn/constants/DataExchange";

const ExchangeReturnPage = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto px-3 sm:px-6 py-2 sm:py-4">
      <DashboardHeader pageName="Exchange Requests" />
      <TabReturn />
      <ButtonsSearch />
      <DataTable columns={ExchangeColumns} data={DataExchange} />
    </div>
  );
};

export default ExchangeReturnPage;
