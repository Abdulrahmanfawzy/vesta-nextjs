import "server-only";

import { getToken } from "@/lib/get-token";
import type { GetProfileResponse } from "@/types/profile.types";

export async function getProfileApi(): Promise<GetProfileResponse> {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const response = await fetch(`${baseUrl}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json() as Promise<GetProfileResponse>;
}