import DashboardHeader from "@/components/layout/DashboardHeader";
import ButtonsSearch from "@/components/shared/DataTable/ButtonsSearch";
import { DataTable } from "@/components/shared/DataTable/data-table";
import { SelectFilter } from "@/components/shared/DataTable/SelectFilter";
import TabReturn from "@/features/returns/components/TabsReturn";
import { refundColumns } from "@/features/refund/components/RefundColumns";
import { refundOrdersData } from "@/features/refund/constants/RefundState";

const ExchangeReturnPage = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto px-3 sm:px-6 py-2 sm:py-4">
      <DashboardHeader pageName="Exchange Requests" />
      <TabReturn />
      <ButtonsSearch />
      <DataTable columns={refundColumns} data={refundOrdersData} />
    </div>
  );
};

export default ExchangeReturnPage;
