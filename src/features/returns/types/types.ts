import type { StaticImageData } from "next/image";

export interface TableList {
  id: number;
  value: string;
  label: string;
}

export type ReturnStatus = "refunded" |"approved" | "pending" | "rejected" |"in_transit" |"cancelled" ;

export interface ReturnRequest {
  id: number;
  created_at: string;
  rma_no: string;
  order_id: string;
  reason_text: string;
  status: ReturnStatus;
  reason_code: string;

  items: {
    product_image_url: string;
    quantity: number;
    unit_price: string;
    variant_id: number;
    order_item_id: number;
    product_id: number;
  }[];
}
