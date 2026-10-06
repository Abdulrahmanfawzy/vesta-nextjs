import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsLabel } from "../constants/Constants";
const TabReturn = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="Return Requests" className="container mx-auto">
        <TabsList className="flex gap-13">
        {TabsLabel.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.value}
            className="text-neutral-dark text-[26px] font-semibold outline-0 border-0 active:border-b border-app-primary"
          >
            {tab.label}
          </TabsTrigger>
        ))}
       
        </TabsList>
        <TabsContent value="Return Requests">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="Refunds">Change your password here.</TabsContent>
        <TabsContent value="Exchange Requests">Change your password here.</TabsContent>
      </Tabs>{" "}
    </div>
  );
};

export default TabReturn;
