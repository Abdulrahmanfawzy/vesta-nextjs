import { Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TicketHeaderProps {
    ticketId: string;
    subject: string;
    description: string;
    status: "open" | "in_progress" | "resolved" | "closed";
    createdAt: string;
    updatedAt: string;
    
}

export default function TicketHeader({ ticketId,subject,description,status,createdAt, updatedAt,
   
}: TicketHeaderProps) {
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
                                    #{ticketId}
                                </p>

                                <h1 className="mt-1 wrap-break text-lg font-semibold tracking-tight text-app-primary sm:text-xl">
                                    {subject}
                                </h1>
                                <p className="max-w-3xl wrap-break text-sm leading-6 text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex min-w-0 flex-col items-start gap-3  pt-4 sm:w-[38%]  sm:pl-5 sm:pt-0">
                            <Badge
                                variant="outline"
                                className="shrink-0 border-amber-200 bg-amber-50 px-3 py-1 text-amber-700"
                            >
                                {status}
                            </Badge>
                            <div className="grid w-full min-w-0 gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">Created</p>
                                    <p className="wrap-break text-sm font-medium text-app-primary">
                                        {createdAt}
                                    </p>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">Last updated</p>
                                    <p className="wrap-break text-sm font-medium text-app-primary">
                                        {updatedAt}
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