export interface TableList {
  id: number;
  value: string;
  label: string;
}
export type ReturnStatus = "accepted" | "pending" | "rejected";

export interface ReturnRequest {
  id: string;
  image: string;
  returnRequestId: string; // "#9999987657"
  orderId: string;
  itemId: string;
  requestDate: string; // "28-5-2026"
  reason: string;
  status: ReturnStatus;
  viewed: boolean; // true -> shows "Viewed", false -> "View Details" link
}
export type Column = {
  accessorKey: string;
  header: string;
}