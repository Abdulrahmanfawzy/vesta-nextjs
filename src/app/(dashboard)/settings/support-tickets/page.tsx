import type { Metadata } from "next";
import { Suspense } from "react";
import SupportTicketsView from "./SupportTicketsView";

export const metadata: Metadata = {
  title: "Support Tickets",
  description: "View and manage support tickets, inquiries, and resolution updates in Vesta.",
};

export default function SupportTicketsPage() {
  return (
    <Suspense>
      <SupportTicketsView />
    </Suspense>
  );
}