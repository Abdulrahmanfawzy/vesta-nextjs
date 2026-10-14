import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";

export const metadata: Metadata = {
  title: "Contact Support",
  description: "Get in touch with the Vesta support team for assistance with return management operations.",
};
import GetInTouchComponent from "./_components/getInTouchComponent"
import SendUsMessage from "./_components/sendUsMessage"

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