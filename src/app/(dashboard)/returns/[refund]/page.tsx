import DashboardHeader from "@/components/layout/DashboardHeader";
import { DataTable } from "@/components/shared/DataTable/data-table";
import SelectFilter from "@/components/shared/DataTable/SelectFilter";
import { RefundStats } from "@/features/refund/components/RefundCards";
import { refundOrdersData } from "@/features/refund/constants/RefundState";
import { refundColumns } from "@/features/returns/components/RefundColumns";
import TabReturn from "@/features/returns/components/TabsReturn";

const Refund = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <DashboardHeader pageName="Refunds" />
      <TabReturn />
      <RefundStats />
      <div className="w-full flex justify-end">
              <SelectFilter/>
            

      </div>
      <DataTable columns={refundColumns} data={refundOrdersData} />
    </div>
  );
};
export default Refund;
