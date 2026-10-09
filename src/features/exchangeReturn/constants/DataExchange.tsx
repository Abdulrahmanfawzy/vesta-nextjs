import MugSmaller from "@/assets/MugSmaller.svg";
import ShoesComfortable from "@/assets/ShoesComfortable.svg";
import TShirt from "@/assets/Tops.svg";
import TweenGirl from "@/assets/TweenGirl.svg";
import WomanCloths from "@/assets/WomanCloths.svg";
import { ExchangeType } from "../types/types.Exchange";


export const headerTableExchange = [
  { accessorKey: "exchangeId", header: "Exchange ID" },
  { accessorKey: "orderId", header: "Order ID" },
  { accessorKey: "productDelivered", header: "Product Delivered" },
  { accessorKey: "requestedProduct", header: "Requested Product" },
  { accessorKey: "buyer", header: "Buyer" },
  { accessorKey: "priceDifference", header: "Price Difference" },
  { accessorKey: "stockAvailability", header: "Stock Availability" },
  { accessorKey: "exchangeReason", header: "Exchange Reason" },
  { accessorKey: "buyerNotes", header: "Buyer Notes" },
  { accessorKey: "image", header: "Image" },
  { accessorKey: "exchangeSettingsStatus", header: "Exchange Settings Status" },
  { accessorKey: "Action", header: "Action" },
] satisfies { accessorKey: keyof ExchangeType; header: string }[];

export const DataExchange: ExchangeType[] = [
  {
    exchangeId: "#EX-10482",
    orderId: "#ORD-58291",
    productDelivered: "iPhone 14 128GB",
    requestedProduct: "iPhone 14 256GB",
    buyer: "Sara Mohammed",
    priceDifference: "120$",
    stockAvailability: "Available",
    exchangeReason: "Wrong storage",
    buyerNotes: "I want bigger storage",
    image: TShirt.src,
    exchangeSettingsStatus: "Accepted",
    Action: "View",
  },
  {
    exchangeId: "#EX-10483",
    orderId: "#ORD-56591",
    productDelivered: "Nike Air Max 270",
    requestedProduct: "Nike Air Max 270 – Size 42",
    buyer: "Amir Haitham",
    priceDifference: "0$",
    stockAvailability: "Available",
    exchangeReason: "Wrong size",
    buyerNotes: "-",
    image: ShoesComfortable.src,
    exchangeSettingsStatus: "Pending",
    Action: "View",
  },
  {
    exchangeId: "#EX-10484",
    orderId: "#ORD-58307",
    productDelivered: "Samsung Galaxy S23",
    requestedProduct: "Samsung Galaxy S24",
    buyer: "Mariam Adel",
    priceDifference: "72$",
    stockAvailability: "Available",
    exchangeReason: "Wrong model",
    buyerNotes: "-",
    image: TweenGirl.src,
    exchangeSettingsStatus: "Rejected",
    Action: "View",
  },
  {
    exchangeId: "#EX-10485",
    orderId: "#ORD-58344",
    productDelivered: "IKEA Office Chair",
    requestedProduct: "IKEA Gaming Chair",
    buyer: "Omnia Alaa",
    priceDifference: "250$",
    stockAvailability: "Available",
    exchangeReason: "Wrong Product",
    buyerNotes: "Product Preference",
    image: WomanCloths.src,
    exchangeSettingsStatus: "Pending",
    Action: "View",
  },
];
