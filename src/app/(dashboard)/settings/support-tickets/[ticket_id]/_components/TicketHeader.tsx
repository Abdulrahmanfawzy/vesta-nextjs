import { Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TicketDetailsResponse } from "@/types/support-ticket.types";
import { formatTicketDate } from "@/lib/format-date";

interface TicketHeaderProps {
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

export default function TicketHeader({ ticket }: TicketHeaderProps) {
    const status = ticket.data.status;

    return (
        <div className="min-w-0 space-y-4">
            {/* Ticket Card */}
            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                        {/* Left */}
                        <div className="flex min-w-0 items-start gap-3 sm:w-[58%]">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E1EDFC] text-[#032271]">
                                <Ticket className="size-5" />
                            </div>

                            {/* ID, subject, and description */}
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {`#TKT-${String(ticket.data.id).padStart(6, "0")}`}
                                </p>

                                <h1 className="mt-1 wrap-break text-lg font-semibold tracking-tight text-app-primary sm:text-xl">
                                    {ticket.data.subject}
                                </h1>
                                <p className="max-w-3xl wrap-break text-sm leading-6 text-muted-foreground">
                                    {ticket.data.description??'when backend added desc will appear in this place'}
                                </p>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex min-w-0 flex-col items-start gap-3  pt-4 sm:w-[38%]  sm:pl-5 sm:pt-0">
                            <Badge
                                variant={getStatusVariant(status)}
                                className="shrink-0 px-3 py-1 capitalize"
                            >
                                {status.replace("_", " ")}
                            </Badge>
                            <div className="grid w-full min-w-0 gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">Created</p>
                                    <p className="wrap-break text-sm font-medium text-app-primary">
                                        {formatTicketDate(ticket.data.created_at)}
                                    </p>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">Last updated</p>
                                    <p className="wrap-break text-sm font-medium text-app-primary">
                                        {formatTicketDate(ticket.data.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}