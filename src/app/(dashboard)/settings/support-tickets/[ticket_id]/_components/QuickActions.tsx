'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAssignSupportAgent } from "@/hooks/useAssignSupportAgent";
import { useCloseTicket } from "@/hooks/useCloseTicket";
import { useSupportAgents } from "@/hooks/useSupportAgents";
import { useUpdateTicketStatus } from "@/hooks/useUpdateTicketStatus";
import { Check, CheckCircle, ChevronDown, UserRound } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TicketStatus } from "@/types/support.types";
interface IProps {
    ticketId: number;
    status: TicketStatus;
    assignedAgentId: number | null;
}
const statuses = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "awaiting_seller", label: "Awaiting Seller" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
] as const;

const QuickActions = ({ ticketId, status, assignedAgentId }: IProps) => {
    const { mutate: closeTicket, isPending: isClosing } = useCloseTicket(ticketId);
    const {
        mutate: assignAgent,
        isPending: isAssigning,
    } = useAssignSupportAgent(ticketId);
    const {
        data: agentsResponse,
        isPending: isLoadingAgents,
        isError: isAgentsError,
        refetch: refetchAgents,
    } = useSupportAgents();
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


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                disabled={isAssigning}
                                className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#5E6061] bg-white text-sm font-medium text-app-primary transition hover:bg-gray-50 disabled:opacity-60"
                            >
                                <UserRound size={16} />
                                {isAssigning ? "Assigning..." : "Assign to"}
                                {!isAssigning && <ChevronDown size={16} />}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            side="bottom"
                            className="w-64 rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-lg"
                        >
                            <DropdownMenuItem
                                disabled={isAssigning || assignedAgentId === null}
                                onSelect={() => assignAgent(null)}
                                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-app-primary focus:bg-gray-100"
                            >
                                <span>Unassigned</span>
                                {assignedAgentId === null && (
                                    <Check size={16} className="text-app-primary" />
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {isLoadingAgents ? (
                                <DropdownMenuItem disabled>
                                    Loading agents...
                                </DropdownMenuItem>
                            ) : isAgentsError ? (
                                <DropdownMenuItem
                                    onSelect={() => void refetchAgents()}
                                    className="cursor-pointer text-sm text-red-600 focus:bg-gray-100"
                                >
                                    Failed to load agents. Retry
                                </DropdownMenuItem>
                            ) : agentsResponse?.data.agents.length ? (
                                agentsResponse.data.agents.map((agent) => (
                                    <DropdownMenuItem
                                        key={agent.id}
                                        disabled={isAssigning || assignedAgentId === agent.id}
                                        onSelect={() => assignAgent(agent.id)}
                                        className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-app-primary focus:bg-gray-100"
                                    >
                                        <span className="flex min-w-0 flex-col">
                                            <span>{agent.name}</span>
                                            <span className="truncate text-xs text-gray-500">
                                                {agent.email}
                                            </span>
                                        </span>
                                        {assignedAgentId === agent.id && (
                                            <Check size={16} className="shrink-0 text-app-primary" />
                                        )}
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <DropdownMenuItem disabled>
                                    No support agents available
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

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