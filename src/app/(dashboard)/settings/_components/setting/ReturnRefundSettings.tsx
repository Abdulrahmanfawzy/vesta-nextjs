
import { ReturnPoliciesData } from "@/types/settings.types";
import PolicyRow from "./PolicyRow";

const policiesList = [
  { id: "return_policy", policyType: "return-policy", title: "Return policy" },
  { id: "return_period", policyType: "return-period", title: "Return period" },
  { id: "conditions", policyType: "conditions", title: "Accepted return conditions" },
  { id: "refund_policy", policyType: "refund-policy", title: "Refund policy" },
  { id: "exchange_policy", policyType: "exchange-policy", title: "Exchange policy" },
  { id: "shipping_policy", policyType: "shipping-policy", title: "Who pays return shipping?" },
] as const;
interface ReturnRefundSettingsProps {
  policies: ReturnPoliciesData;
}
const ReturnRefundSettings =  ({policies}:ReturnRefundSettingsProps) =>{
   
  return (

   <div className="flex w-full flex-col gap-2">
        {policiesList.map((policy) => (
          <PolicyRow
            key={policy.id}
            title={policy.title}
            url={policies[policy.id]}
            policyKey={policy.policyType}
          />
        ))}
      </div>
);}

export default ReturnRefundSettings;
