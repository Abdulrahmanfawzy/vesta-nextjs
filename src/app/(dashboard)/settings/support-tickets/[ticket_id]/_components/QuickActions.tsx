'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCloseTicket } from "@/hooks/useCloseTicket";
import { useUpdateTicketStatus } from "@/hooks/useUpdateTicketStatus";
import { Check, CheckCircle, ChevronDown, UserRound } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TicketStatus } from "@/types/support.types";
interface IProps {
    ticketId: number;
    status: TicketStatus;
}
const statuses = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "awaiting_seller", label: "Awaiting Seller" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
] as const;

const QuickActions = ({ ticketId, status }: IProps) => {
    const { mutate: closeTicket, isPending: isClosing } = useCloseTicket(ticketId);
    const {
        mutate: changeStatus,
        isPending: isUpdatingStatus,
    } = useUpdateTicketStatus(ticketId);
    // const isPending = isClosing || isUpdatingStatus;
    return (
        <Card>
            <CardHeader className="px-5 pb-3 pt-5">
                <h2 className="text-base font-semibold text-app-primary">Quick Actions</h2>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                disabled={isUpdatingStatus}
                                className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#5E6061] bg-app-primary px-3 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                <span>{isUpdatingStatus ? "updating..." :"Change Status"}</span>
                                {!isUpdatingStatus &&<ChevronDown size={16} />}
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="start"
                            side="bottom"
                            className="w-64 rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-lg"
                        >
                            {statuses.map((statusOption) => (
                                <DropdownMenuItem
                                    key={statusOption.value}
                                    disabled={isUpdatingStatus || statusOption.value === status}
                                    onSelect={() => changeStatus(statusOption.value)}
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-app-primary focus:bg-gray-100"
                                >
                                    <span>{statusOption.label}</span>

                                    {status === statusOption.value && (
                                        <Check size={16} className="text-app-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <button
                        type="button"
                        className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#5E6061] bg-white text-sm font-medium text-app-primary transition hover:bg-gray-50"
                    >
                        <UserRound size={16} />
                        Assign to
                    </button>

                    <button
                        type="button"
                        disabled={isClosing}
                        onClick={() => closeTicket()}
                        className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#5E6061] bg-white text-sm font-medium text-[#161C36] transition hover:bg-gray-50"
                    >
                        <CheckCircle size={16} />
                        {isClosing ? "Closing..." : "Close Ticket"}
                    </button>
                </div>


            </CardContent>
        </Card>
    )
}

export default QuickActions