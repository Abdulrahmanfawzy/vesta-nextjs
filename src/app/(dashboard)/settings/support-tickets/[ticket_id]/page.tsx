import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TicketHeader from "./_components/TicketHeader";
import Conversation from "./_components/Conversation";
import TicketInformation from "./_components/TicketInformation";
import RelatedInformation from "./_components/RelatedInformation";
import QuickActions from "./_components/QuickActions";
import TicketDetailsView from "./_components/TicketDetailsView";

interface PageProps {
  params: Promise<{
    ticket_id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { ticket_id } = await params;
  const decodedId = decodeURIComponent(ticket_id);

  return {
    title: `Ticket ${decodedId}`,
    description: `Support ticket details and conversation history for ${decodedId} in Vesta.`,
  };
}

const TicketDetailsPage = async ({ params }: PageProps) => {
  const { ticket_id } = await params;
  const decodedId = decodeURIComponent(ticket_id);

  return (
    <div className="w-full min-w-0 px-3 sm:px-6">
      <DashboardHeader
        className="max-w-[55vw] truncate text-sm font-medium sm:max-w-none sm:text-2xl"
        pageName="Back To My Support Tickets"
        icon={
          <Link
            href="/settings/support-tickets"
            aria-label="Back to support tickets"
            className="flex shrink-0 items-center"
          >
            <ArrowLeft className="size-5 sm:size-7.5" />
          </Link>
        }
      />
      <TicketDetailsView ticketId={ticket_id} />
    </div>
  );
};

export default TicketDetailsPage;