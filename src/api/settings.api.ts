import "server-only";

import type { ReturnPoliciesResponse } from "@/types/settings.types";
import {  getToken } from "@/lib/get-token";
const TOKEN=getToken();

export const getReturnPolicies =
  async (): Promise<ReturnPoliciesResponse> => {
    const response = await fetch(
      `${process.env.API}/api/settings/return-policies`,
      {
        headers: {
          Accept: "application/json",
           Authorization: `Bearer ${TOKEN}`,
          
        },
      }
    );

    if (!response.ok) {
        
      throw new Error(`Failed to fetch return policies (${response.status})`);
    }

    return response.json();
  };
