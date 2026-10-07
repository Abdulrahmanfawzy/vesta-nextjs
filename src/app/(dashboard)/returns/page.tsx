import DashboardHeader from "@/components/layout/DashboardHeader";
import TabReturn from "@/features/returns/components/TabsReturn";
import DataTable from "../../../components/shared/DataTable/DataTable";
import { Column, MockData } from "@/features/returns/constants/Constants";

const ReturnPage = () => {
    return (
        <div className="flex flex-col gap-4 container mx-auto">
            <DashboardHeader pageName="Returns" />
            <TabReturn/>
            <DataTable column={Column} data={MockData}/>
        </div>
    );
}   

export default ReturnPage