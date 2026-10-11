import DashboardHeader from "@/components/layout/DashboardHeader"
import GetInTouchComponent from "./getInTouchComponent"
import SendUsMessage from "./sendUsMessage"

interface IProps {



}

const ContactSupportPage=({}:IProps)=> {
  return (
    <div>
        <DashboardHeader pageName="Contact Support" className="text-2xl" />
        <div className="flex w-full min-w-0 gap-8 mb-8">
          
          <GetInTouchComponent />
          <SendUsMessage />
            
        </div>

    </div>
  )
}

export default ContactSupportPage