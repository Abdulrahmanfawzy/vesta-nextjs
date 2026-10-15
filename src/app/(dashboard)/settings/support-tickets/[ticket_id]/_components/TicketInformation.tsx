import { Badge } from "@/components/ui/badge";
import { InformationCard, InformationRow } from "./InformationCard";
import { TicketDetailsResponse } from "@/types/support-ticket.types";
import { formatTicketDate } from "@/lib/format-date";

interface TicketInformationProps {
    ticket: TicketDetailsResponse;
}
const getStatusVariant = (status: TicketDetailsResponse["data"]["status"]) => {
    switch (status) {
        case "open":
        case "awaiting_seller":
            return "pending";
        case "in_progress":
            return "inprogress";
        case "resolved":
            return "success";
        default:
            return "closed";
    }
};
export default function TicketInformation({ ticket}: TicketInformationProps) {
    return (
        <InformationCard title="Ticket Information">
            <InformationRow label="Ticket Id">
                <p className="font-medium text-app-primary">{`#TKT-${String(ticket.data.id).padStart(6, "0")}`}</p>
            </InformationRow>
            <InformationRow label="Subject">
                <p className="font-medium text-app-primary">{ticket.data.subject}</p>
            </InformationRow>
            <InformationRow label="Status">
                <Badge
                    variant={getStatusVariant(ticket.data.status)}
                    className="shrink-0 px-3 py-1 capitalize"
                >
                    {ticket.data.status.replace("_", " ")}
                </Badge>
            </InformationRow>
            <InformationRow label="Created At">
                <p className="text-foreground">{formatTicketDate(ticket.data.created_at)}</p>
            </InformationRow>
            <InformationRow label="Last Updated">
                <p className="text-foreground">{formatTicketDate(ticket.data.updated_at)}</p>
            </InformationRow>
            <InformationRow label="Priority">
                <span className="flex items-center gap-1.5 text-foreground">
                    <span className="size-2 rounded-full bg-app-warning-medium" />
                    {ticket.data.priority ?? "Not specified"}
                </span>
            </InformationRow>
        </InformationCard>
    );
}
