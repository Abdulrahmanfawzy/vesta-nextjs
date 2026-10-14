
import { ReturnPoliciesData } from "@/types/settings.types";
import PolicyRow from "./PolicyRow";

const policiesList = [
  { id: "return_policy", title: "Return policy" },
  { id: "return_period", title: "Return period" },
  { id: "conditions", title: "Accepted return conditions" },
  { id: "refund_policy", title: "Refund policy" },
  { id: "exchange_policy", title: "Exchange policy" },
  { id: "shipping_policy", title: "Who pays return shipping?" },
] as const;
interface ReturnRefundSettingsProps {
  policies: ReturnPoliciesData;
}
const ReturnRefundSettings =  ({policies}:ReturnRefundSettingsProps) =>{
   
  return (

   <div className="flex w-full flex-col gap-2">
        {policiesList.map((policy) => (
          <PolicyRow key={policy.id} title={policy.title} url={policies[policy.id]} />
        ))}
      </div>
);}

export default ReturnRefundSettings;
