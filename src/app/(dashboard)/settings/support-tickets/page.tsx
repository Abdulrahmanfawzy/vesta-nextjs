"use client";

import CustomTabs from "@/components/common/CustomTabs";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { DataTable } from "@/components/shared/DataTable/data-table";
import { Badge } from "@/components/ui/badge";
import {
  type DataTableFeatures,
} from "@/features/returns/components/data-table-features";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type SupportTicket = {
  ticketId: string;
  subject: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  lastUpdated: string;
};

const columnHelper = createColumnHelper<DataTableFeatures, SupportTicket>();

const columns = columnHelper.columns([
  columnHelper.accessor("ticketId", {
    header: "Ticket Id",
     cell: ({ getValue }) => (
    <span className=" text-[#658DCA]">
      {getValue()}
    </span>
  ),
  }),
  columnHelper.accessor("subject", {
    header: "subject",
  }),
  columnHelper.accessor("status", {
    header: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "open"
          ? "pending"
          : status === "in_progress"
            ? "inprogress"
            : status === "resolved"
              ? "success"
              : "closed";

      return <Badge className="p-3" variant={variant}>{status.replace("_", " ")}</Badge>;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "created at",
  }),
  columnHelper.accessor("lastUpdated", {
    header: "last updated",
  }),
  columnHelper.display({
    id: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        href={`/settings/support-tickets/${row.original.ticketId}`}
        className="flex w-full items-center justify-center"
      >
        <Eye className="w-4 h-4 text-app-neutral-dark " />
      </Link>
    ),
  }),
]);

const supportTickets: SupportTicket[] = [
  {
    ticketId: "TKT-000123",
    subject: "Issue with return report",
    status: "open",
    createdAt: "May 20, 2025 · 10:24 PM",
    lastUpdated: "May 22, 2025 · 02:15 PM",
  },
  {
    ticketId: "TKT-000124",
    subject: "Unable to download monthly statement",
    status: "in_progress",
    createdAt: "May 24, 2025 · 09:10 AM",
    lastUpdated: "May 25, 2025 · 11:30 AM",
  },
  {
    ticketId: "TKT-000125",
    subject: "Update account billing information",
    status: "resolved",
    createdAt: "May 26, 2025 · 01:45 PM",
    lastUpdated: "May 27, 2025 · 04:20 PM",
  },
  {
    ticketId: "TKT-000126",
    subject: "Question about order fulfillment",
    status: "closed",
    createdAt: "May 28, 2025 · 08:05 AM",
    lastUpdated: "May 29, 2025 · 12:00 PM",
  },
];

// tabs 
const tabs = [
  {
    value: "all",
    label: "All",
    content: '',
  },
  {
    value: "open",
    label: "Open",
    content: '',
  },
    {
    value: "in_progress",
    label: "In Progress",
    content: '',
  },
      {
    value: "resolved",
    label: "Resolved",
    content: '',
  },
     {
    value: "closed",
    label: "Closed",
    content: '',
  }
]; 


const SupportTicketPage = () => {
   const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();



  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("status", value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };
  return (
    <div className="container mx-auto flex flex-col gap-4 px-3 py-2 sm:px-6 sm:py-4">
      <DashboardHeader pageName="My Support Tickets" className="text-2xl" />
      <div className="border border-app-neutral-light shadow-xs rounded-2xl p-3">
         <CustomTabs tabs={tabs} className="px-4 pt-4 border-b border-app-neutral-light mb-6 "  onValueChange={handleTabChange}/>
       
        <DataTable<SupportTicket> columns={columns} data={supportTickets} />
      
      </div>
    </div>
  );
};

export default SupportTicketPage;