import { getFAQsAction } from "@/actions/faq-actions";
import { FAQSection } from "@/types/faq.types";
import { useQuery } from "@tanstack/react-query";

export function useGetFAQs(category: FAQSection) {
  return useQuery({
    queryKey: ["faqs", category],
    queryFn: () => getFAQsAction(category),
  });
}