import "server-only";

import { getToken } from "@/lib/get-token";
import type {
  TicketDetailsResponse,
  UpdateTicketStatusRequest,
  UpdateTicketStatusResponse,
} from "@/types/support-ticket.types";
import type { TicketStatus } from "@/types/support.types";

export interface SupportAgent {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
}

export interface SupportAgentsResponse {
  success: boolean;
  message: string;
  data: {
    agents: SupportAgent[];
  };
}

export interface AssignSupportAgentResponse {
  success: boolean;
  message: string;
  data: TicketDetailsResponse["data"];
}

const getTicketActionErrorMessage = async (
  response: Response,
  fallback: string,
) => {
  try {
    const body: { message?: string } = await response.json();
    return body.message || fallback;
  } catch {
    return fallback;
  }
};

export const getSupportAgents = async (): Promise<SupportAgentsResponse> => {
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const baseUrl = process.env.API;
  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const response = await fetch(`${baseUrl}/api/support-agents`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      await getTicketActionErrorMessage(
        response,
        `Failed to fetch support agents (${response.status})`,
      ),
    );
  }

  return response.json() as Promise<SupportAgentsResponse>;
};

export const assignSupportAgent = async (
  ticketId: number,
  assignedAgentId: number | null,
): Promise<AssignSupportAgentResponse> => {
  if (!Number.isSafeInteger(ticketId) || ticketId <= 0) {
    throw new Error("Invalid support ticket ID");
  }
  if (
    assignedAgentId !== null &&
    (!Number.isSafeInteger(assignedAgentId) || assignedAgentId <= 0)
  ) {
    throw new Error("Invalid support agent ID");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const baseUrl = process.env.API;
  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const response = await fetch(
    `${baseUrl}/api/support/${ticketId}/assign`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assigned_agent_id: assignedAgentId }),
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to assign tickets.");
  }
  if (response.status === 403) {
    throw new Error("Only an Owner can assign support tickets.");
  }
  if (response.status === 404) {
    throw new Error("Support ticket not found.");
  }
  if (response.status === 422) {
    throw new Error(
      await getTicketActionErrorMessage(
        response,
        "The selected support agent is invalid or inactive.",
      ),
    );
  }
  if (!response.ok) {
    throw new Error(`Failed to assign support agent (${response.status})`);
  }

  return response.json() as Promise<AssignSupportAgentResponse>;
};

export async function getDetailsTicketsApi(ticketId:number):Promise<TicketDetailsResponse>{

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }


 
  const baseUrl = process.env.API;

  const response = await fetch(
    `${baseUrl}/api/support/${ticketId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

 
    if (!response.ok) {
        
      throw new Error(`Failed to fetch detail for this ticket  (${response.status})`);
    }

  return response.json() ;
}

export const closeTicket = async (ticketId: number): Promise<void> => {
    const token = await getToken();
  const response = await fetch(
    `${process.env.API}/api/support/${ticketId}/close`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to close ticket (${response.status})`);
  }
};

export const updateTicketStatus = async (
  ticketId: number,
  status: TicketStatus,
): Promise<UpdateTicketStatusResponse> => {
  if (!Number.isSafeInteger(ticketId) || ticketId <= 0) {
    throw new Error("Invalid support ticket ID");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const payload: UpdateTicketStatusRequest = { status };
  const response = await fetch(
    `${process.env.API}/api/support/${ticketId}/status`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to update ticket status.");
  }
  if (response.status === 403) {
    throw new Error("Only an Owner can update ticket status.");
  }
  if (response.status === 404) {
    throw new Error("Support ticket not found.");
  }
  if (response.status === 422) {
    let errorMessage = "The selected ticket status is invalid.";
    try {
      const errorResponse: { message?: string } = await response.json();
      errorMessage = errorResponse.message || errorMessage;
    } catch {
      
    }
    throw new Error(errorMessage);
  }
  if (!response.ok) {
    throw new Error(`Failed to update ticket status (${response.status})`);
  }

  return response.json();
};