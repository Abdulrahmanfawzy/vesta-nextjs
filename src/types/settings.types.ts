import type { LucideIcon } from "lucide-react";



export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}



//--------------------------------------------------------- 

export interface ReturnPoliciesData {
  return_policy: string;
  return_period: string;
  conditions: string;
  refund_policy: string;
  exchange_policy: string;
  shipping_policy: string;
}

export interface ReturnPoliciesResponse {
  success: boolean;
  message: string;
  data: ReturnPoliciesData;
}
//--------------------------------------------------------- 
