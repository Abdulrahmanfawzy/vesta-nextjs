import { getFAQsAction } from "@/actions/faq-actions";
import { getReturnPoliciesAction } from "@/actions/setting.actions";
import { FAQSection } from "@/types/faq.types";
import { useQuery } from "@tanstack/react-query";

export function useGetReturnPolicy(selectedSetting = "return_refund") {
  return useQuery({
    queryKey: ["return-policies"],
       queryFn: getReturnPoliciesAction,
       enabled: selectedSetting === "return_refund",
  });
}