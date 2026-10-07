import { TableList } from "../types/types";
import Tyer from "@/assets/Tyres.png"
import Shoes from "@/assets/Shoes.png"
import Mug from "@/assets/Mug.png"
import Lovset from "@/assets/Lovset.png"
import sweetbant from "@/assets/sweetbant.png"
export const TabsLabel: TableList[] = [
  { id: 1, value: "Return Requests", label: "Return Requests" },
  { id: 2, value: "Refunds", label: "Refunds" },
  { id: 3, value: "Exchange Requests", label: "Exchange Requests" },
];
export const STATUSES: TableList[] = [
  { id: 1, value: "all", label: "All Status" },
  { id: 2, value: "pending", label: "Pending" },
  { id: 3, value: "approved", label: "Approved" },
  { id: 4, value: "rejected", label: "Rejected" },
  { id: 5, value: "completed", label: "Completed" },
];
export const Column = [
  { header: "Order Image", accessorKey: "image" },
  { header: "Return Request ID", accessorKey: "ReturnRequestID" },
  { header: "Order ID", accessorKey: "orderId" },
  { header: "Item ID", accessorKey: "itemID" },
  { header: "Request Date", accessorKey: "RequestDate" },
  { header: "Status", accessorKey: "status" },
  { header: "Action", accessorKey: "Action" },
]
export const MockData = [
  {
    image:Tyer ,
    ReturnRequestID: "#9999987657",
    orderId: "#8965445534",
    itemID: "#1111112236",
    RequestDate: "28-05-2026",
    status: "Accepted",
    Action: "Viewed",
    id: 1,
  },
  {
    id: 2,
    ReturnRequestID: "#9999987657",
    orderId: "#8965445534",
    itemID: "#1111112236",
    RequestDate: "28-05-2026",
    status: "Pending",
    Action: "Viewed",
        image:Mug,
  },
  {
    id: 3,
    ReturnRequestID: "#9999987657",
    orderId: "#8965445534",
    itemID: "#1111112236",
    RequestDate: "28-05-2026",
    status: "Rejected",
    Action: "Viewed",
    image:sweetbant,
  },
  {
    id: 4,
    ReturnRequestID: "#9999987657",
    orderId: "#8965445534",
    itemID: "#1111112236",
    RequestDate: "28-05-2026",
    status: "Pending",
    Action: "Viewed", 
    image:Lovset,
  },
  {
    id: 5,
    ReturnRequestID: "#9999987657",
    orderId: "#8965445534",
    itemID: "#1111112236",
    RequestDate: "28-05-2026",
    status: "Rejected",
    Action: "Viewed",
    image:Shoes,
  },

];
