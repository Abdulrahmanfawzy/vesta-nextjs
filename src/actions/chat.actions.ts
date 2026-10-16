"use server";

import {
  getChatMessagesApi,
  deleteChatMessageApi,
  markChatReadApi,
  openTicketChatApi,
  sendChatMessageApi,
  updateChatMessageApi,
} from "@/api/chat.api";
import { auth } from "@/lib/auth/auth";

export async function openTicketChatAction(ticketId: number) {
  const [chat, session] = await Promise.all([
    openTicketChatApi(ticketId),
    auth(),
  ]);

  return { ...chat, currentUserId: session?.user.id ?? null };
}

export async function getChatMessagesAction(
  chatId: number,
  page: number,
  perPage: number,
) {
  return getChatMessagesApi(chatId, page, perPage);
}

export async function sendChatMessageAction(chatId: number, payload: FormData) {
  return sendChatMessageApi(chatId, payload);
}

export async function deleteChatMessageAction(
  chatId: number,
  messageId: number,
) {
  return deleteChatMessageApi(chatId, messageId);
}

export async function updateChatMessageAction(
  chatId: number,
  messageId: number,
  body: string,
) {
  return updateChatMessageApi(chatId, messageId, body);
}

export async function markChatReadAction(chatId: number) {
  return markChatReadApi(chatId);
}
