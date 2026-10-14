import { getToken } from "@/lib/get-token";

export const GetReturnsData = async (status: string) => {
  const token = await getToken();

  try {
    const res = await fetch(
      `${process.env.API}/api/return-requests?status=${status}&page=1&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch returns");
    }
    return res.json();
  } catch (error) {}
};

export const GetExchangeData = async () => {
  const token = await getToken();
  try {
    const response = await fetch(`${process.env.API}/api/exchanges`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  
    
    console.log(process.env.API);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

