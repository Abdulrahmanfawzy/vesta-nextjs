import { ProductTable } from "@/types/global.type";
import {
  AnalysisResponse,
  FinancialImpact,
  ReturnByReason,
  ReturnCustomer,
  ReturnsFunnel,
  ReturnsOverTime,
} from "../types/analysis.types";
import { getToken } from "@/lib/get-token";

// 1. Return by products
export const getReturnByProducts = async (): Promise<
  AnalysisResponse<ProductTable[]>
> => {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.API}/api/analytics/returns-by-product`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer  ${token}`,
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
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.API}/api/analytics/returns-by-customer`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer  ${token}`,
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
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.API}/api/analytics/returns-over-time`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer  ${token}`,
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
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.API}/api/analytics/return-funnel`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer  ${token}`,
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
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.API}/api/analytics/returns-by-reason`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer  ${token}`,
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
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.API}/api/analytics/financial-impact`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer  ${token}`,
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
