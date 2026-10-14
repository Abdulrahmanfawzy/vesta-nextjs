import { getToken } from "@/lib/get-token";

export const GetRefundData = async () => {
  const token = await getToken();
  try {
    const res = await fetch(`${process.env.API}/api/refunds `, {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(`Failed to fetch refunds: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    console.log("Refunds data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching refunds:", error);
    throw error;
  }
};
