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

export interface RefundCountItem {
  value: number;
  percentage: number;
}

export interface RefundCounts {
  completed?: RefundCountItem;
  pending?: RefundCountItem;
  rejected?: RefundCountItem;
  refunded_amount?: RefundCountItem;
  total_refund?: RefundCountItem;
}

export type dataCount = RefundCounts;

export interface RefundOrder {  
  id:number , 
  order_id:number ,
  order_date:string , 
  customer:{  
    id:number , 
    name:string , 
    email:string , 
    avatar_url:string
  } ,
  refund_reason:string|null,
  refund_amount:number,
  status:string,
  refund_date:string, 
  action :React.ReactNode
}

export interface RefundPagination {
  current_page?: number;
  per_page?: number;
  total?: number;        // total records
  total_pages?: number;
  last_page?: number;    // Laravel alias for total_pages
  count?: number;        // some APIs use count instead of total
}

/** Common API shapes supported:
 *  1. { pagination: { total, total_pages, current_page, per_page } }
 *  2. { meta: { total, last_page, current_page, per_page } }  (Laravel standard)
 *  3. { total, last_page, current_page, per_page }  (top-level)
 */
export interface RefundApiResponse {
  counts: RefundCounts;
  data: RefundOrder[];
  pagination?: RefundPagination;
  meta?: RefundPagination;     // Laravel /meta envelope
  total?: number;              // top-level total
  last_page?: number;          // top-level last_page
  current_page?: number;       // top-level current_page
  per_page?: number;           // top-level per_page
}






