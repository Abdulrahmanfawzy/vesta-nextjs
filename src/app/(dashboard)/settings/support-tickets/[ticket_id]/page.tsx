import DashboardHeader from "@/components/layout/DashboardHeader"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import TicketHeader from "./_components/TicketHeader"
import Conversation from "./_components/Conversation"
import TicketInformation from "./_components/TicketInformation"
import RelatedInformation from "./_components/RelatedInformation"
import QuickActions from "./_components/QuickActions"

interface IProps {



}

const TicketDetailsPage = ({ }: IProps) => {
  return (
    <div>
      <DashboardHeader
        className="cursor-pointer  text-2xl font-medium"
        pageName="Back To My Support Tickets"
        icon={
          <Link href="/settings/support-tickets">
            <ArrowLeft size={30} />
          </Link>
        }

      />
      <main className="grid w-full min-w-0 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,6.5fr)_minmax(0,3.5fr)] lg:gap-3">
        <div className="flex min-w-0 flex-col gap-3">
          {/*--- -----------------------------------------------------------------*/}

          <TicketHeader
            ticketId="TKT-000123"
            subject="Issue with return report"
            description="The return report for the last week is not showing the correct numbers. Please check and advise."
            status="open"
            createdAt="May 20, 2025 · 10:24 PM"
            updatedAt="May 22, 2025 · 02:15 PM"
          />
          {/*--- Conversation -----------------------------------------------------------------*/}
          <Conversation />
        </div>

        {/*--right---------------------------------------------------------------------------- */}
        <aside className="min-w-0 space-y-2.5">
          <TicketInformation
            ticketId="#TKT-000123"
            subject="Issue with return report"
            status="Open"
            createdAt="May 20, 2025 · 10:24 PM"
            updatedAt="May 22, 2025 · 02:15 PM"
            priority="Medium"
          />
          <RelatedInformation />
          <QuickActions />
        </aside>
      </main>

    </div>
  )
}

export default TicketDetailsPage