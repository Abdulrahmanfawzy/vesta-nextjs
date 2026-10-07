import DashboardHeader from "@/components/layout/DashboardHeader";
import { columns, ReturnRequest } from "@/features/returns/components/Columns";
import { DataTable } from "@/features/returns/components/data-table";
import TabReturn from "@/features/returns/components/TabsReturn";
// import DataTable from "../../../components/shared/DataTable/DataTable";
import {returnRequests } from "@/features/returns/constants/Constants";

const ReturnPage = () => {
    return (
        <div className="flex flex-col gap-4 container mx-auto">
            <DashboardHeader pageName="Returns" />
            <TabReturn/>
            {/* <DataTable column={Column} data={MockData}/> */}
            <DataTable<ReturnRequest> columns={columns}  data={returnRequests}/>
        </div>
    );
}   

export default ReturnPage