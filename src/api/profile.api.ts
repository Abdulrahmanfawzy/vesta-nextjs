import "server-only";

import { getToken } from "@/lib/get-token";
import type { GetProfileResponse, UpdateProfileResponse } from "@/types/profile.types";

function normalizeAvatarUrl(
  avatarUrl: string | null,
  baseUrl: string,
): string | null {
  if (!avatarUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(avatarUrl)) {
    return avatarUrl;
  }

  const imagePath = avatarUrl.replace(/^\/+/, "");
  const storagePath = imagePath.startsWith("storage/")
    ? imagePath
    : `storage/${imagePath}`;

  return new URL(storagePath, `${baseUrl.replace(/\/+$/, "")}/`).toString();
}

function normalizeProfileAvatar<T extends GetProfileResponse | UpdateProfileResponse>(
  response: T,
  baseUrl: string,
): T {
  if (!response.data?.user) {
    return response;
  }

  return {
    ...response,
    data: {
      user: {
        ...response.data.user,
        avatar_url: normalizeAvatarUrl(response.data.user.avatar_url, baseUrl),
      },
    },
  };
}

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

  const result = (await response.json()) as GetProfileResponse;
  return normalizeProfileAvatar(result, baseUrl);
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

  formData.set("_method", "PUT");

  const response = await fetch(`${baseUrl}/api/user`, {
    method: "POST",
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

  return normalizeProfileAvatar(result as UpdateProfileResponse, baseUrl);
}