import type { StaticImageData } from "next/image";

export type StatTone = "orange" | "indigo" | "green" | "red";
export type TrendTone = "positive" | "negative" | "neutral";
export type StatIcon =
  | "refund"
  | "wallet"
  | "completed"
  | "pending"
  | "rejected";

export interface RefundStat {
  id: string;
  label: string;
  value: string;
  note: string;
  noteHighlight?: string; // colored part of the note (e.g. "+12.5%")
  trend: TrendTone;
  tone: StatTone;
  icon: StatIcon;
}

export interface RefundOrder {
  id: string;
  orderId: string;
  RequestDate: string;

  customer: {
    name: string;
    email: string;
    image: StaticImageData | string;
  };

  refundReason: string;
  refundAmount: number;
  status: "Accepted" | "Pending" | "Rejected";
  refundDate: string;
  Action: string;
}
