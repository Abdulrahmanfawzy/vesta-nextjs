import "server-only";
import type { SupportTicketsResponse } from "@/types/support.types";
import { getToken } from "@/lib/get-token";

export interface GetSupportTicketsParams {
  page?: number;
  per_page?: number;
  status?: string;
}

export async function getSupportTicketsApi(
  params: GetSupportTicketsParams = {},
): Promise<SupportTicketsResponse> {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.per_page !== undefined) {
    searchParams.set("per_page", String(params.per_page));
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  const query = searchParams.toString();
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const response = await fetch(
    `${baseUrl}/api/support${query ? `?${query}` : ""}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

 
    if (!response.ok) {
        
      throw new Error(`Failed to fetch support tickets  (${response.status})`);
    }

  return response.json() as Promise<SupportTicketsResponse>;
}