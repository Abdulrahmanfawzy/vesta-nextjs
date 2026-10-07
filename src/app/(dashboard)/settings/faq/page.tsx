'use client'
import DashboardHeader from "@/components/layout/DashboardHeader"
import FaqSidebar, { FAQSection } from "./FaqSidebar";
import { useState } from "react";
import FaqContent from "./FaqContent";
import Link from "next/link";

interface IProps {



}

const FqaPage = ({ }: IProps) => {
  const [selectedSection, setSelectedSection] = useState<FAQSection>("All");
  return (
    <div>
      <DashboardHeader pageName="FQA" />

      <div  className="flex w-full min-w-0 gap-8">
        <FaqSidebar
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-2xl font-bold text-app-primary leading-[150%] tracking-[-2.2%] mb-6 mt-3">Frequently Asked Questions</h1>

          <FaqContent  />
          <div className="my-12">
            <p className="text-base font-bold text-app-black-80">Still have questions ?</p>
            <p className="text-sm text-app-neutral-dark-60">
              Contact our
              <Link href="/settings/contact-support">
                <span className="text-app-error ml-1">Support Team</span>
              </Link>
            </p>
          </div>
        </div>
      </div>



    </div>
  )
}

export default FqaPage