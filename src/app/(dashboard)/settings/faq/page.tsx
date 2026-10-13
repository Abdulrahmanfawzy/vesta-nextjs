'use client'
import DashboardHeader from "@/components/layout/DashboardHeader"
import FaqSidebar from "./_components/FaqSidebar";
import { useState } from "react";
import FaqContent from "./_components/FaqContent";
import Link from "next/link";
import { FAQSection } from "@/types/faq.types";
import { useGetFAQs } from "@/hooks/FaqPage";
import FaqSkeleton from "./_components/FaqSkeleton";
import FaqError from "./_components/FaqError";


export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions and guides about Vesta returns, refunds, reports, and integrations.",
};



}

const FqaPage = ({ }: IProps) => {
  const [selectedSection, setSelectedSection] = useState<FAQSection>("All");
  const {
    data: faqs = [],
    isPending,
    isError,
  } = useGetFAQs(selectedSection);

  return (
    <div>
      <DashboardHeader pageName="FQA" className="text-2xl" />

      <div className="flex w-full min-w-0 gap-8">
        <FaqSidebar
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-2xl font-bold text-app-primary leading-[150%] tracking-[-2.2%] mb-6 mt-3">Frequently Asked Questions</h1>

          {isPending ? (
            <FaqSkeleton />
          ) :
           isError ? (
            <FaqError />
          ) : faqs.length === 0 ? (
            <p>No FAQs found.</p>
          ) : (
            <FaqContent faqs={faqs} />
          )}
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
