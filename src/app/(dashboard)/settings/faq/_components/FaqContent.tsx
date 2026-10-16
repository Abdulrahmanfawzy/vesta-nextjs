
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types/faq.types";


interface FaqContentProps {
  faqs: FAQ[];
}


const FaqContent = ({ faqs }: FaqContentProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full min-w-0 space-y-4"
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={`faq-${faq.id}`}
          className="min-w-0 rounded-xl border border-[#E5E7EB] px-4 sm:px-5"
        >
          <AccordionTrigger className="min-w-0 break-words py-5 text-start text-sm font-medium text-primary hover:no-underline sm:text-base">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="break-words pb-5 text-sm leading-6 text-gray-500">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqContent;