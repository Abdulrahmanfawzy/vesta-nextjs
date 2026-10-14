
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
      className="w-full space-y-4"
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={`faq-${faq.id}`}
          className="rounded-xl border border-[#E5E7EB] px-5"
        >
          <AccordionTrigger className="py-5 text-start text-base font-medium text-primary hover:no-underline">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="pb-5 text-sm leading-6 text-gray-500">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqContent;