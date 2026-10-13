import { OverviewResponse } from "../types/overview.type";

export async function getOverviewReturn(): Promise<OverviewResponse> {
  try {
    const response = await fetch(`/backend/overview`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Failed to fetch overview data");
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch overview data");
  }
}
