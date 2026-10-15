import { getToken } from "@/lib/get-token";
import { RefundApiResponse } from "@/features/refund/types/types";

export const GetRefundData = async (
  status: string = "",
  reason: string = "",
  per_page: number = 10,
  page: number = 1,
  search: string = "",
  date_from: string = "",
  date_to: string = ""
): Promise<RefundApiResponse> => {
  const token = await getToken();

  const params = new URLSearchParams();

  if (status) params.set("status", status);
  if (reason) params.set("reason", reason);
  if (search) params.set("search", search);
  if (date_from) params.set("date_from", date_from);
  if (date_to) params.set("date_to", date_to);

  params.set("per_page", String(per_page));
  params.set("page", String(page));

  try {
    const res = await fetch(
      `${process.env.API}/api/refunds?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok || data.success === false) {
      throw new Error(
        `Failed to fetch refunds: ${res.status} ${data.message}`
      );
    }

    // Temporary: log to see exact API shape (remove once pagination fields confirmed)
    console.log("[Refund API] full response keys:", Object.keys(data));
    console.log("[Refund API] pagination/meta:", data.pagination ?? data.meta ?? { total: data.total, last_page: data.last_page, total_pages: data.total_pages });

    return data;
  } catch (error) {
    console.error("Error fetching refunds:", error);
    throw error;
  }
};