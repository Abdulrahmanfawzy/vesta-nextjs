"use server";

import { getAttchmentsChatTicketApi } from "@/api/attachments.api";

export  default async function getAttchmentsChatTicketAction(ticketId: number) {
  return await getAttchmentsChatTicketApi(ticketId);
}