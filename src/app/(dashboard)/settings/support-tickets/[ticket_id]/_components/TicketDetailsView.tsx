"use client";

import { useTicketDetails } from "@/hooks/useTicketDetails";
import TicketHeader from "./TicketHeader";
import Conversation from "./Conversation";
import TicketInformation from "./TicketInformation";
import RelatedInformation from "./RelatedInformation";
import QuickActions from "./QuickActions";
import { formatTicketDate } from "@/lib/format-date";


interface TicketDetailsViewProps {
  ticketId: string;
}

export default function TicketDetailsView({
  ticketId,
}: TicketDetailsViewProps) {
  const { data: response, isPending, isError, error } = useTicketDetails(ticketId);

  if (isPending) {
    return (
      <main className="grid w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,6.5fr)_minmax(0,3.5fr)]">
        <div className="flex flex-col gap-3">
          <div className="h-48 animate-pulse rounded-xl bg-muted" />
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-48 animate-pulse rounded-xl bg-muted" />
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-lg border p-4 text-sm">
        {error instanceof Error
          ? error.message
          : "Failed to load ticket details."}
      </div>
    );
  }

 

  return (
    <main className="grid w-full min-w-0 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,6.5fr)_minmax(0,3.5fr)] lg:gap-3">
      <div className="flex min-w-0 flex-col gap-3">
        <TicketHeader ticket={response} />

        <Conversation ticketId={response.data.id} />
      </div>

      <aside className="min-w-0 space-y-2.5">
        <TicketInformation  ticket={response}   />

        <RelatedInformation ticket={response} />
        {response.data.status !== 'closed' && <QuickActions
          ticketId={response.data.id}
          status={response.data.status}
          assignedAgentId={response.data.assigned_agent_id}
        />}
        
      </aside>
    </main>
  );
}