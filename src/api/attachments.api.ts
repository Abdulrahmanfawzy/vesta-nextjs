import "server-only";
import { getToken } from "@/lib/get-token";
import type { TicketAttachmentsResponse } from "@/types/support.types";



export async function getAttchmentsChatTicketApi (
  ticketId: number,
): Promise<TicketAttachmentsResponse> {
  if (!Number.isSafeInteger(ticketId) || ticketId <= 0) {
    throw new Error("Invalid support ticket ID");
  }

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const response = await fetch(
    `${process.env.API}/api/support/${ticketId}/attachments`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

 
  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to view attachments.");
  }
  if (response.status === 404) {
    throw new Error("Ticket not found or you do not have access to it.");
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch ticket attachments (${response.status})`);
  }

  return response.json();
}