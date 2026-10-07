import type { StaticImageData } from "next/image";

export interface TableList {
  id: number;
  value: string;
  label: string;
}

export type ReturnStatus = "accepted" | "pending" | "rejected";

export interface ReturnRequest {
  id: string;
  image: StaticImageData;
  ReturnRequestID: string;
  orderId: string;
  itemID: string;
  RequestDate: string;
  status: ReturnStatus;
  Action: boolean;
}