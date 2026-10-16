export type ExchangeStatus = "completed" | "pending" | "rejected" | string;

export type ExchangeType = {
  id: number;
  exchange_id?: number;
  order_id: number;
  product_delivered?: string;
  requested_product?: string;
  buyer?: {
    name?: string;
    email?: string;
    avatar_url?: string;
  };
  price_difference?: string | number;
  stock_availability?: string;
  exchange_reason?: string;
  buyer_notes?: string;
  photos?: string[];
  status?: ExchangeStatus;
  Action?: string;
  created_at?: string;
};


 