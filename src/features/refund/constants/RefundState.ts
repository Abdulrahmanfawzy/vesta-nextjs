import { RefundOrder, RefundStat } from "../types/types";
import MugSmaller from "@/assets/MugSmaller.svg";
import ShoesComfortable from "@/assets/ShoesComfortable.svg";
import TShirt from "@/assets/Tops.svg";
import TweenGirl from "@/assets/TweenGirl.svg";
import WomanCloths from "@/assets/WomanCloths.svg";
// Mock data — keep separate from the component and replace with your API data.

export const refundStats: RefundStat[] = [
  {
    id: "total-refund",
    label: "Total Refund",
    value: "12,540",
    noteHighlight: "+12.5%",
    note: " vs last 30 days",
    trend: "positive",
    tone: "orange",
    icon: "refund",
  },
  {
    id: "refunded-amount",
    label: "Refunded Amount",
    value: "$125,430.75",
    noteHighlight: "+8.2%",
    note: " vs last 30 days",
    trend: "positive",
    tone: "indigo",
    icon: "wallet",
  },
  {
    id: "completed",
    label: "Completed",
    value: "9,152",
    note: "72.9% of total",
    trend: "neutral",
    tone: "green",
    icon: "completed",
  },
  {
    id: "pending",
    label: "Pending",
    value: "2,310",
    note: "18.4% of total",
    trend: "neutral",
    tone: "orange",
    icon: "pending",
  },
  {
    id: "rejected",
    label: "Rejected",
    value: "1,078",
    noteHighlight: "8.6%",
    note: " of total",
    trend: "negative",
    tone: "red",
    icon: "rejected",
  },
];

// Column definitions moved to RefundColumns.tsx (TanStack feature-based)

export const refundOrdersData: RefundOrder[] = [
  {
    id: "1",
    orderId: "#ORD987657",
    RequestDate: "May 21, 2025",
    customer: {
      name: "Ahmed Saad",
      email: "Ahmed.Saad@gmail.com",
      image: MugSmaller,
    },
    refundReason: "Wrong Size",
    refundAmount: 45,
    status: "Accepted",
    refundDate: "May 22, 2025",
    Action: "View Details",
  },
  {
    id: "2",
    orderId: "#ORD987658",
    RequestDate: "May 20, 2025",
    customer: {
      name: "Sara Mohamed",
      email: "Sara.Mohamed@gmail.com",
      image: WomanCloths,
    },
    refundReason: "Wrong Product",
    refundAmount: 30.0,
    status: "Pending",
    refundDate: "May 21, 2025",
    Action: "View Details",
  },
  {
    id: "3",
    orderId: "#ORD987659",
    RequestDate: "May 19, 2025",
    customer: {
      name: "Mayar Ahmed",
      email: "Mayar.Ahmed@gmail.com",
      image: TweenGirl,
    },
    refundReason: "Product Defect",
    refundAmount: 25.0,
    status: "Rejected",
    refundDate: "May 20, 2025",
    Action: "View Details",
  },
  {
    id: "4",
    orderId: "#ORD987660",
    RequestDate: "May 18, 2025",
    customer: {
      name: "Yara Mosaad",
      email: "Yara.Mosaad@gmail.com",
      image: ShoesComfortable,
    },
    refundReason: "Does not match description",
    refundAmount: 50.0,
    status: "Accepted",
    refundDate: "May 19, 2025",
    Action: "View Details",
  },
  {
    id: "5",
    orderId: "#ORD987661",
    RequestDate: "May 17, 2025",
    customer: {
      name: "Maya Sayed",
      email: "Maya.Sayed@gmail.com",
      image: TShirt,
    },
    refundReason: "Customer changed mind",
    refundAmount: 15.0,
    status: "Pending",
    refundDate: "May 18, 2025",
    Action: "View Details",
  },
];
