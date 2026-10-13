// 3-step
"use server";
import { getFAQs } from "@/api/faq.api";
import { FAQSection } from "@/types/faq.types";


export async function getFAQsAction(category: FAQSection) {
  return await getFAQs(category);
}