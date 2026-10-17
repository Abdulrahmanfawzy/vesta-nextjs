import type { Metadata } from "next";
import { Suspense } from "react";
import SupportTicketsView from "./SupportTicketsView";
import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Support Tickets",
  description: "View and manage support tickets, inquiries, and resolution updates in Vesta.",
};

export default function SupportTicketsPage() {
  return (
    <Suspense>
      <SupportTicketsView
        header={
          <DashboardHeader
            pageName="My Support Tickets"
            className="text-lg sm:text-2xl"
          />
        }
      />
    </Suspense>
  );
}