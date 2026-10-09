import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export interface Policy {
  id: string;
  title: string;
  fileUrl?: string;
}
export const policies: Policy[] = [
  {
    id: "return-policy",
    title: "Return policy",
  },
  {
    id: "return-period",
    title: "Return period",
  },
  {
    id: "accepted-return-conditions",
    title: "Accepted return conditions",
  },
  {
    id: "refund-policy",
    title: "Refund policy",
  },
  {
    id: "exchange-policy",
    title: "Exchange policy",
  },
  {
    id: "return-shipping",
    title: "Who pays return shipping?",
  },
];