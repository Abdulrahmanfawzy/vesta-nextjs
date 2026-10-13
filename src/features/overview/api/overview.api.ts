import { OverviewResponse } from "../types/overview.type";
import { getToken } from "@/lib/get-token";

export async function getOverviewReturn(): Promise<OverviewResponse> {
  const token = await getToken();
  try {
    const response = await fetch(`${process.env.API}/api/overview`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer  ${token}`,
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
