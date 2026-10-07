
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: 1,
    question: "How do I Process a return?",
    answer:
      "",
  },
  {
    id: 2,
    question: "How long does a refund take?",
    answer:
      "Refunds are usually processed within 5–7 business days after the return is approved.",
  },
  {
    id: 3,
    question: "How can I track my return rate?",
    answer:
      "",
  },
  {
    id: 4,
    question: "How can I export my return data?",
    answer:
      "",
  },
   {
    id: 5,
    question: "How do I manage user permissions?",
    answer:
      "",
  }, {
    id: 6,
    question: "How do integrations work?",
    answer:
      "",
  },
];


const FaqList = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
    >
      {faqData.map((faq) => (
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

export default FaqList;