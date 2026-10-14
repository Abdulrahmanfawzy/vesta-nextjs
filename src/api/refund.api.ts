export const GetRefundData = async () => {
  try {
    const res = await fetch(`${process.env.API}/api/refunds `, {
      headers: {
        Authorization: ` Bearer ${process.env.AUTH_SECRET}`,
      },
      cache: "no-store",
    });
    console.log(process.env.AUTH_SECRET);

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
