import { policies } from "../../../../../types/settings.types";
import PolicyRow from "./PolicyRow";

const ReturnRefundSettings = () => (
   <div className="flex w-full flex-col gap-2">
        {policies.map((policy) => (
          <PolicyRow key={policy.id} title={policy.title}  />
        ))}
      </div>
);

export default ReturnRefundSettings;
