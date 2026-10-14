export type ExchangeStatus = "completed" | "pending" | "rejected";
export type ExchangeType = {
id: number ; 
order_id: number ;
product_delivered: string ;
requested_product: string ;
buyer: string | null ;
price_difference: string ;
stock_availability: string ;
exchange_reason: string ;
buyer_notes: string ;
photos: string[] ;
status: ExchangeStatus ;
Action: string;
};


 