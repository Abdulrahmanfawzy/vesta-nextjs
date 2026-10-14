export const GetReturnsData = async (status: string) => {
  try {
    const res = await fetch(
      `${process.env.API}/api/return-requests?status=${status}&page=1&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch returns");
    }
    return res.json();
  } catch (error) {}
};

