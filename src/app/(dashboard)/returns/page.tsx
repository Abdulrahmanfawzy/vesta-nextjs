import TabReturn from "@/features/returns/components/TabsReturn";

const ReturnPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-app-primary text-[26px] font-bold  ">Return Page</h1>

            <TabReturn/>
        </div>
    );
}   

export default ReturnPage