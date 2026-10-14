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





