import DashboardHeader from "@/components/layout/DashboardHeader";
import { DataTable } from "@/components/shared/DataTable/data-table";
import {SelectFilter} from "@/components/shared/DataTable/SelectFilter";
import { columns, ReturnRequest } from "@/features/returns/components/Columns";
import TabReturn from "@/features/returns/components/TabsReturn";
import { returnRequests } from "@/features/returns/constants/Constants";

type ReturnParm = {
  searchParams: Promise<{
    status?: "string" | "";
  }>;
};
const ReturnPage = async ({ searchParams }: ReturnParm) => {
  const { status } = await searchParams;
  console.log(status);

  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <DashboardHeader pageName="Returns" />
      <TabReturn />
      <div className="w-full flex justify-end">
        <SelectFilter />
      </div>

      <DataTable<ReturnRequest> columns={columns} data={returnRequests} />
    </div>
  );
};

export default ReturnPage;
