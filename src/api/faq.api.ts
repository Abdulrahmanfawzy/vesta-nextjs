//-2- After ts response make this 
"server only";

import { FAQ, FAQSection, FAQsResponse } from "@/types/faq.types";

export async function getFAQs(
  category: FAQSection,
): Promise<FAQ[]> {
  const params = new URLSearchParams();

  if (category !== "All") {
    params.set("category", category);
  }

  const query = params.toString();
  const url = `${process.env.BACKEND_URL}/api/faqs${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
          Accept: "application/json",
           Authorization: `Bearer ${process.env.API_TOKEN}`,
          
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