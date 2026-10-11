export type ExchangeStatus = "Accepted" | "Pending" | "Rejected";
export type ExchangeType = {
  exchangeId: string;
  orderId: string;
  productDelivered: string;
  requestedProduct: string;
  buyer: string;
  priceDifference: string;
  stockAvailability: string;
  exchangeReason: string;
  buyerNotes: string;
  image: string;
  exchangeSettingsStatus: ExchangeStatus;
  Action: string;
};