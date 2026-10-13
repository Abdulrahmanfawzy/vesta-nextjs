import { ProductTable } from "@/types/global.type";
import {
  AnalysisResponse,
  FinancialImpact,
  ReturnByReason,
  ReturnCustomer,
  ReturnsFunnel,
  ReturnsOverTime,
} from "../types/analysis.types";

// 1. Return by products
export const getReturnByProducts = async (): Promise<
  AnalysisResponse<ProductTable[]>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}analytics/returns-by-product`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NtYXJ0LXJldHVybnMuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3OTE4MjIyMzQsImV4cCI6MzE3OTE4MjIyMzQsIm5iZiI6MTc5MTgyMjIzNCwianRpIjoiM1VUT2pLOWtOWHZuRG1rOSIsInN1YiI6IjEiLCJwcnYiOiJhY2MwN2UzYTk3Mzc2Y2M2YmU3ZTJlOWNhZjRlZTllNjQ5MGU0MDVhIiwidG9rZW5faWQiOiJlYTQ4ODllNy0xNDBlLTQxNWEtOTgwYS01N2Q3NjkyYjkxYTUifQ.B_sWEVjNE0tg3KnqO7RADey63ujzDG4i41X9bAysIp0`,
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Failed to fetch  return by product data");
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch  return by product data");
  }
};

// 2. Return by customers
export const getReturnByCustomer = async (): Promise<
  AnalysisResponse<ReturnCustomer>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}analytics/returns-by-customer`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NtYXJ0LXJldHVybnMuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3OTE4MjIyMzQsImV4cCI6MzE3OTE4MjIyMzQsIm5iZiI6MTc5MTgyMjIzNCwianRpIjoiM1VUT2pLOWtOWHZuRG1rOSIsInN1YiI6IjEiLCJwcnYiOiJhY2MwN2UzYTk3Mzc2Y2M2YmU3ZTJlOWNhZjRlZTllNjQ5MGU0MDVhIiwidG9rZW5faWQiOiJlYTQ4ODllNy0xNDBlLTQxNWEtOTgwYS01N2Q3NjkyYjkxYTUifQ.B_sWEVjNE0tg3KnqO7RADey63ujzDG4i41X9bAysIp0`,
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Failed to fetch return by customer data");
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch return by customer data");
  }
};

// 3. Return Over Time
export const getReturnOverTime = async (): Promise<
  AnalysisResponse<ReturnsOverTime>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}analytics/returns-over-time`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NtYXJ0LXJldHVybnMuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3OTE4MjIyMzQsImV4cCI6MzE3OTE4MjIyMzQsIm5iZiI6MTc5MTgyMjIzNCwianRpIjoiM1VUT2pLOWtOWHZuRG1rOSIsInN1YiI6IjEiLCJwcnYiOiJhY2MwN2UzYTk3Mzc2Y2M2YmU3ZTJlOWNhZjRlZTllNjQ5MGU0MDVhIiwidG9rZW5faWQiOiJlYTQ4ODllNy0xNDBlLTQxNWEtOTgwYS01N2Q3NjkyYjkxYTUifQ.B_sWEVjNE0tg3KnqO7RADey63ujzDG4i41X9bAysIp0`,
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Failed to fetch  return over time data");
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch  return over time data");
  }
};

// 4. Return Funnel
export const getReturnFunnel = async (): Promise<
  AnalysisResponse<ReturnsFunnel>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}analytics/return-funnel`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NtYXJ0LXJldHVybnMuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3OTE4MjIyMzQsImV4cCI6MzE3OTE4MjIyMzQsIm5iZiI6MTc5MTgyMjIzNCwianRpIjoiM1VUT2pLOWtOWHZuRG1rOSIsInN1YiI6IjEiLCJwcnYiOiJhY2MwN2UzYTk3Mzc2Y2M2YmU3ZTJlOWNhZjRlZTllNjQ5MGU0MDVhIiwidG9rZW5faWQiOiJlYTQ4ODllNy0xNDBlLTQxNWEtOTgwYS01N2Q3NjkyYjkxYTUifQ.B_sWEVjNE0tg3KnqO7RADey63ujzDG4i41X9bAysIp0`,
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Failed to fetch return funnel data");
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch return funnel data");
  }
};

// 5. Return by reason
export const getReturnByReason = async (): Promise<
  AnalysisResponse<ReturnByReason[]>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}analytics/returns-by-reason`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NtYXJ0LXJldHVybnMuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3OTE4MjIyMzQsImV4cCI6MzE3OTE4MjIyMzQsIm5iZiI6MTc5MTgyMjIzNCwianRpIjoiM1VUT2pLOWtOWHZuRG1rOSIsInN1YiI6IjEiLCJwcnYiOiJhY2MwN2UzYTk3Mzc2Y2M2YmU3ZTJlOWNhZjRlZTllNjQ5MGU0MDVhIiwidG9rZW5faWQiOiJlYTQ4ODllNy0xNDBlLTQxNWEtOTgwYS01N2Q3NjkyYjkxYTUifQ.B_sWEVjNE0tg3KnqO7RADey63ujzDG4i41X9bAysIp0`,
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Failed to fetch return by reason data");
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch return by reason data");
  }
};

// 6. Financial Impact
export const getFinancialImpact = async (): Promise<
  AnalysisResponse<FinancialImpact>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}analytics/financial-impact`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NtYXJ0LXJldHVybnMuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3OTE4MjIyMzQsImV4cCI6MzE3OTE4MjIyMzQsIm5iZiI6MTc5MTgyMjIzNCwianRpIjoiM1VUT2pLOWtOWHZuRG1rOSIsInN1YiI6IjEiLCJwcnYiOiJhY2MwN2UzYTk3Mzc2Y2M2YmU3ZTJlOWNhZjRlZTllNjQ5MGU0MDVhIiwidG9rZW5faWQiOiJlYTQ4ODllNy0xNDBlLTQxNWEtOTgwYS01N2Q3NjkyYjkxYTUifQ.B_sWEVjNE0tg3KnqO7RADey63ujzDG4i41X9bAysIp0`,
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Failed to fetch financial impact data");
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch financial impact data");
  }
};
