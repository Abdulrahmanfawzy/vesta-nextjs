


import type { Metadata } from "next";
import DashboardHeader from "@/components/layout/DashboardHeader";
import FaqView from "./_components/FaqView";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions and guides about Vesta returns, refunds, reports, and integrations.",
};




const FqaPage = () => {
 

  return (
    <div>
      <FaqView header={<DashboardHeader pageName="FAQ" className="text-2xl" />} />
    </div>
  )
}

export default FqaPage
