


import type { Metadata } from "next";
import FaqView from "./_components/FaqView";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions and guides about Vesta returns, refunds, reports, and integrations.",
};




const FqaPage = () => {
 

  return (
    <div>
      <FaqView />

     


    </div>
  )
}

export default FqaPage
