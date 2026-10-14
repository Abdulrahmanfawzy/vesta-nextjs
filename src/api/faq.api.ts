//-2- After ts response make this 
"server only";

import { getToken } from "@/lib/get-token";
import { FAQ, FAQSection, FAQsResponse } from "@/types/faq.types";


export async function getFAQs(
  category: FAQSection,
): Promise<FAQ[]> {
  const TOKEN = await getToken();
  const params = new URLSearchParams();

  if (category !== "All") {
    params.set("category", category);
  }

  const query = params.toString();
  const url = `${process.env.API}/api/faqs${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
          Accept: "application/json",
           Authorization: `Bearer ${TOKEN}`,
          
        },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  const result: FAQsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch FAQs");
  }

  return result.data;
}