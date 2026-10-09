import { Badge } from "@/components/ui/badge";
import { InformationCard, InformationRow } from "./InformationCard";

interface TicketInformationProps {
    ticketId: string;
    subject: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    priority: string;
}

export default function TicketInformation({ ticketId, subject, status,createdAt,updatedAt,priority,
}: TicketInformationProps) {
    return (
        <InformationCard title="Ticket Information">
            <InformationRow label="Ticket Id">
                <p className="font-medium text-app-primary">{ticketId}</p>
            </InformationRow>
            <InformationRow label="Subject">
                <p className="font-medium text-app-primary">{subject}</p>
            </InformationRow>
            <InformationRow label="Status">
                <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-app-warning-medium"
                >
                    {status}
                </Badge>
            </InformationRow>
            <InformationRow label="Created At">
                <p className="text-foreground">{createdAt}</p>
            </InformationRow>
            <InformationRow label="Last Updated">
                <p className="text-foreground">{updatedAt}</p>
            </InformationRow>
            <InformationRow label="Priority">
                <span className="flex items-center gap-1.5 text-foreground">
                    <span className="size-2 rounded-full bg-app-warning-medium" />
                    {priority}
                </span>
            </InformationRow>
        </InformationCard>
    );
}
