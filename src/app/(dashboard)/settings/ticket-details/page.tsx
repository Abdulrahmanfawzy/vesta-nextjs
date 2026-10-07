import DashboardHeader from "@/components/layout/DashboardHeader"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface IProps {



}

const TicketDetailsPage=({}:IProps)=> {
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
       <div>
                ticket details content
       </div>

    </div>
  )
}

export default TicketDetailsPage