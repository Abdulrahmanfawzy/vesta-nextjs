import { getToken } from "@/lib/get-token";
import { RefundApiResponse } from "@/features/refund/types/types";

export const GetRefundData = async (
  status: string = "",
  reason: string = "",
  per_page: number = 10,
  page: number = 1,
  search: string = "",
  date_from: string = "",
  date_to: string = "",
): Promise<RefundApiResponse> => {
  const token = await getToken();
  const params = new URLSearchParams();

  const filter = {
    status,
    reason,
    per_page,
    page,
    search,
    date_from,
    date_to,
  };
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  try {
    const res = await fetch(
      `${process.env.API}/api/refunds?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok || data.success === false) {
      throw new Error(`Failed to fetch refunds: ${res.status} ${data.message}`);
    }

    // Temporary: log to see exact API shape (remove once pagination fields confirmed)
    console.log("[Refund API] full response keys:", Object.keys(data));
    console.log(
      "[Refund API] pagination/meta:",
      data.pagination ??
        data.meta ?? {
          total: data.total,
          last_page: data.last_page,
          total_pages: data.total_pages,
        },
    );

    return data;
  } catch (error) {
    console.error("Error fetching refunds:", error);
    throw error;
  }
};
