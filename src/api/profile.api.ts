import "server-only";

import { getToken } from "@/lib/get-token";
import type { GetProfileResponse, UpdateProfileResponse } from "@/types/profile.types";

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

export async function updateProfileApi(
  formData: FormData,
): Promise<UpdateProfileResponse> {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const response = await fetch(`${baseUrl}/api/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result as UpdateProfileResponse;
}