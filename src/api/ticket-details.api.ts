import "server-only";

import { getToken } from "@/lib/get-token";
import { TicketDetailsResponse } from "@/types/support-ticket.types";



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