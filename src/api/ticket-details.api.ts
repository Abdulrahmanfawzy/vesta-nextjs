import "server-only";

import { getToken } from "@/lib/get-token";
import type {
  TicketDetailsResponse,
  UpdateTicketStatusRequest,
  UpdateTicketStatusResponse,
} from "@/types/support-ticket.types";
import type { TicketStatus } from "@/types/support.types";



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