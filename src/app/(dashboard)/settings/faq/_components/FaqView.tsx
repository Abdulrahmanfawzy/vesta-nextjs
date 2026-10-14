'use client';
import DashboardHeader from "@/components/layout/DashboardHeader";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FAQSection } from "@/types/faq.types";
import FaqSidebar from "./FaqSidebar";
import { useGetFAQs } from "@/hooks/useGetFaqs";
import FaqError from "./FaqError";
import FaqSkeleton from "./FaqSkeleton";
import FaqContent from "./FaqContent";
import { toast } from "sonner";

export default function FaqView() {
 
 const [selectedSection, setSelectedSection] = useState<FAQSection>("All");
  const {
    data: faqs = [],
    isPending,
    isError,
    error,
  } = useGetFAQs(selectedSection);

  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load FAQs.",
      );
    }
  }, [isError, error]);

  return (
    <div>
      <DashboardHeader pageName="FAQ" className="text-2xl" />

      <div className="flex w-full min-w-0 gap-8">
        <FaqSidebar
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-2xl font-bold text-app-primary leading-[150%] tracking-[-2.2%] mb-6 mt-3">
            Frequently Asked Questions
          </h1>

             {isPending ? (
            <FaqSkeleton />
          ) :
           isError ? (
            <FaqError />
          ) : faqs.length === 0 ? (
            <p>No FAQs found.</p>
          ) : (
            <FaqContent faqs={faqs}  />
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
  );
}
