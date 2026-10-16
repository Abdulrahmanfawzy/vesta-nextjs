import { getToken } from "@/lib/get-token";

export const GetReturnsData = async (
  status: string,
  page: number,
  per_page: number,
) => {
  const filters = {
    status,
    page,
    per_page,
  };

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  const token = await getToken();

  try {
    const res = await fetch(
      `${process.env.API}/api/return-requests?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    // Read the response body only once
    const data = await res.json();

    console.log("[Returns API] Full response keys:", Object.keys(data));

    console.log(
      "[Returns API] Pagination:",
      data.pagination ??
        data.meta ?? {
          total: data.total,
          last_page: data.last_page,
          total_pages: data.total_pages,
        },
    );

    if (!res.ok || data.success === false) {
      throw new Error(
        `Failed to fetch returns: ${res.status} ${
          data.message ?? "Unknown error"
        }`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching returns:", error);
    throw error;
  }
};

export const GetExchangeData = async (
  status: string,
  page: number,
  per_page: number,
) => {
  const filters = {
    status,
    page,
    per_page,
  };

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.API}/api/exchanges?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    // Read the response body only once
    const data = await response.json();

    console.log("[Exchange API] Full response keys:", Object.keys(data));

    console.log(
      "[Exchange API] Pagination:",
      data.pagination ??
        data.meta ?? {
          total: data.total,
          last_page: data.last_page,
          total_pages: data.total_pages,
        },
    );

    if (!response.ok || data.success === false) {
      throw new Error(
        `Failed to fetch exchanges: ${response.status} ${
          data.message ?? "Unknown error"
        }`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching exchanges:", error);
    throw error;
  }
};
