import "server-only";

import type { ReturnPoliciesResponse } from "@/types/settings.types";

export const getReturnPolicies =
  async (): Promise<ReturnPoliciesResponse> => {
    const response = await fetch(
      `${process.env.API}/settings/return-policies`,
      {
        headers: {
          Accept: "application/json",
           Authorization: `Bearer ${process.env.API_TOKEN}`,
          
        },
      }
    );

    if (!response.ok) {
        
      throw new Error(`Failed to fetch return policies (${response.status})`);
    }

    return response.json();
  };
