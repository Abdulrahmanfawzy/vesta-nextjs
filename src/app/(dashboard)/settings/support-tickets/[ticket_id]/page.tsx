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
    <div>
      <DashboardHeader
        className="cursor-pointer text-2xl font-medium"
        pageName="Back To My Support Tickets"
        icon={
          <Link href="/settings/support-tickets">
            <ArrowLeft size={30} />
          </Link>
        }
      />
     <TicketDetailsView  ticketId={ticket_id} />
    </div>
  );
};

export default TicketDetailsPage;