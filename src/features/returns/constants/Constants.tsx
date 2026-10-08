import { TableList } from "../types/types";
import Tyer from "@/assets/Tyres.png";
import Shoes from "@/assets/Shoes.png";
import Mug from "@/assets/Mug.png";
import Lovset from "@/assets/Lovset.png";
import sweetbant from "@/assets/sweetbant.png";
import { ReturnRequest } from "../components/Columns";
export const TabsLabel: TableList[] = [
  { id: 1, value: "return", label: "Return Requests" },
  { id: 2, value: "refunds", label: "Refunds" },
  { id: 3, value: "exchange-requests", label: "Exchange Requests" },
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
];
export const returnRequests: ReturnRequest[] = [
  {
    id: "1",
    image: Tyer.src,
    ReturnRequestID: "#9999987657",
    orderId: "#8965445534",
    itemID: "#1111112236",
    RequestDate: "28-05-2026",
    status: "Accepted",
    Action: "viewed",
  },

  {
    id: "2",
    image: Shoes.src,
    ReturnRequestID: "#9999987658",
    orderId: "#8965445535",
    itemID: "#1111112237",
    RequestDate: "29-05-2026",
    status: "Pending",
    Action: "viewed",
  },

  {
    id: "3",
    image: Mug.src,
    ReturnRequestID: "#9999987659",
    orderId: "#8965445536",
    itemID: "#1111112238",
    RequestDate: "30-05-2026",
    status: "Rejected",
    Action: "View Details",
  },
  {
    id: "4",
    image: Lovset.src,
    ReturnRequestID: "#92334487659",
    orderId: "#89212534",
    itemID: "#1133112238",
    RequestDate: "30-05-2026",
    status: "Rejected",
    Action: "View Details",
  },
  {
    id: "5",
    image: sweetbant.src,
    ReturnRequestID: "#5468745415",
    orderId: "#1234567890",
    itemID: "#0000000000",
    RequestDate: "25-04-2026",
    status: "Accepted",
    Action: "View Details",
  },
];
