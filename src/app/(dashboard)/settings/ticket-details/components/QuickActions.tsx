import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle, ChevronDown, Reply, UserRound } from "lucide-react"

interface IProps {



}

const QuickActions = ({ }: IProps) => {
    return (
        <Card>
            <CardHeader className="px-5 pb-3 pt-5">
                <h2 className="text-base font-semibold text-app-primary">Quick Actions</h2>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        className="flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#161C36] text-sm font-medium text-white transition hover:opacity-90"
                    >
                        <Reply size={16} />
                        Reply
                    </button>

                    <button
                        type="button"
                        className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#5E6061] bg-white text-sm font-medium text-[#161C36] transition hover:bg-gray-50"
                    >
                        <span>Change Status</span>
                        <ChevronDown size={16} />
                    </button>

                    <button
                        type="button"
                        className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#5E6061] bg-white text-sm font-medium text-[#161C36] transition hover:bg-gray-50"
                    >
                        <UserRound size={16} />
                        Assign to
                    </button>

                    <button
                        type="button"
                        className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#5E6061] bg-white text-sm font-medium text-[#161C36] transition hover:bg-gray-50"
                    >
                        <CheckCircle size={16} />
                        Close Ticket
                    </button>
                </div>


            </CardContent>
        </Card>
    )
}

export default QuickActions