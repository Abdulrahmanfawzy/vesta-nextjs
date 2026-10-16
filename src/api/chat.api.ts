import "server-only";

import { getToken } from "@/lib/get-token";
import type {
  ChatMessagesResponse,
  OpenChatResponse,
  SendChatMessageResponse,
} from "@/types/chat.types";
import {
  CHAT_ATTACHMENT_EXTENSIONS,
  MAX_CHAT_ATTACHMENT_COUNT,
  MAX_CHAT_ATTACHMENT_SIZE,
  MAX_CHAT_MESSAGE_LENGTH,
} from "@/lib/chat-attachments";

export async function getChatMessagesApi(
  chatId: number,
  page = 1,
  perPage = 20,
): Promise<ChatMessagesResponse> {
  if (!Number.isSafeInteger(chatId) || chatId <= 0) {
    throw new Error("Invalid chat ID");
  }
  if (!Number.isSafeInteger(page) || page < 1) {
    throw new Error("Invalid messages page");
  }
  if (!Number.isSafeInteger(perPage) || perPage < 1 || perPage > 100) {
    throw new Error("Messages per page must be between 1 and 100.");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const response = await fetch(
    `${process.env.API}/api/chats/${chatId}/messages?page=${page}&per_page=${perPage}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to view messages.");
  }
  if (response.status === 404) {
    throw new Error("Chat not found or you do not have access to it.");
  }
  if (response.status === 422) {
    const errorResponse: { message?: string } = await response
      .json()
      .catch(() => ({}));
    throw new Error(errorResponse.message || "Invalid message pagination.");
  }
  if (!response.ok) {
    throw new Error(`Failed to load chat messages (${response.status})`);
  }

  return response.json();
}

// --------------------------------------------------

export async function openTicketChatApi(
  ticketId: number,
): Promise<OpenChatResponse> {
  if (!Number.isSafeInteger(ticketId) || ticketId <= 0) {
    throw new Error("Invalid support ticket ID");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const response = await fetch(
    `${process.env.API}/api/chats/tickets/${ticketId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to open this chat.");
  }

  if (response.status === 404) {
    throw new Error("Support ticket not found or you do not have access to it.");
  }

  if (!response.ok) {
    throw new Error(`Failed to open support ticket chat (${response.status})`);
  }

  return response.json();
}
// --------------------------------------------------
export async function sendChatMessageApi(
  chatId: number,
  payload: FormData,
): Promise<SendChatMessageResponse> {
  if (!Number.isSafeInteger(chatId) || chatId <= 0) {
    throw new Error("Invalid chat ID");
  }

  const body = payload.get("body");
  const text = typeof body === "string" ? body : "";
  const files = payload.getAll("attachments[]");
  const attachments = files.filter((file): file is File => file instanceof File);

  if (files.length !== attachments.length) {
    throw new Error("One or more attachments are invalid.");
  }

  if (!text.trim() && attachments.length === 0) {
    throw new Error("Enter a message or attach at least one file.");
  }
  if (text.length > MAX_CHAT_MESSAGE_LENGTH) {
    throw new Error("Messages cannot exceed 5,000 characters.");
  }
  if (attachments.length > MAX_CHAT_ATTACHMENT_COUNT) {
    throw new Error("You can attach up to 5 files.");
  }

  for (const file of attachments) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (
      !extension ||
      !CHAT_ATTACHMENT_EXTENSIONS.includes(
        extension as (typeof CHAT_ATTACHMENT_EXTENSIONS)[number],
      )
    ) {
      throw new Error(`${file.name} has an unsupported file type.`);
    }
    if (file.size > MAX_CHAT_ATTACHMENT_SIZE) {
      throw new Error(`${file.name} exceeds the 10 MB file size limit.`);
    }
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const response = await fetch(
    `${process.env.API}/api/chats/${chatId}/messages`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: payload,
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to send messages.");
  }

  if (response.status === 404) {
    throw new Error("Chat not found or you do not have access to it.");
  }

  if (response.status === 422) {
    let errorMessage = "The message or attachments are invalid.";
    try {
      const errorResponse: { message?: string } = await response.json();
      errorMessage = errorResponse.message || errorMessage;
    } catch {
      
    }
    throw new Error(errorMessage);
  }

  if (!response.ok) {
    throw new Error(`Failed to send chat message (${response.status})`);
  }

  return response.json();
}
// --------------------------------------------------

export interface DeleteChatMessageResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
  };
}

export async function deleteChatMessageApi(chatId: number,messageId: number,): Promise<DeleteChatMessageResponse> {
  if (!Number.isSafeInteger(chatId) || chatId <= 0) {
    throw new Error("Invalid chat ID");
  }
  if (!Number.isSafeInteger(messageId) || messageId <= 0) {
    throw new Error("Invalid message ID");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const response = await fetch(
    `${process.env.API}/api/chats/${chatId}/messages/${messageId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to delete messages.");
  }
  if (response.status === 403) {
    throw new Error("You can only delete messages that you sent.");
  }
  if (response.status === 404) {
    throw new Error("Chat or message not found, or you do not have access.");
  }
  if (!response.ok) {
    throw new Error(`Failed to delete chat message (${response.status})`);
  }

  return response.json();
}

// --------------------------------------------------
export interface UpdateChatMessageApiResponse {
  success: boolean;
  message: string;
  data: SendChatMessageResponse["data"];
}

export async function updateChatMessageApi(
  chatId: number,
  messageId: number,
  body: string,
): Promise<UpdateChatMessageApiResponse> {
  if (!Number.isSafeInteger(chatId) || chatId <= 0) {
    throw new Error("Invalid chat ID");
  }
  if (!Number.isSafeInteger(messageId) || messageId <= 0) {
    throw new Error("Invalid message ID");
  }
  if (!body.trim()) {
    throw new Error("Message cannot be empty.");
  }
  if (body.length > MAX_CHAT_MESSAGE_LENGTH) {
    throw new Error("Messages cannot exceed 5,000 characters.");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const response = await fetch(
    `${process.env.API}/api/chats/${chatId}/messages/${messageId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ body: body.trim() }),
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to update messages.");
  }
  if (response.status === 403) {
    throw new Error("You can only update messages that you sent.");
  }
  if (response.status === 404) {
    throw new Error("Chat or message not found, or you do not have access.");
  }
  if (response.status === 422) {
    let errorMessage = "The message cannot be edited.";
    try {
      const errorResponse: { message?: string } = await response.json();
      errorMessage = errorResponse.message || errorMessage;
    } catch {
      // Use a generic validation message if the response is not JSON.
    }
    throw new Error(errorMessage);
  }
  if (!response.ok) {
    throw new Error(`Failed to update chat message (${response.status})`);
  }

  return response.json();
}

export interface MarkChatReadResponse {
  success: boolean;
  message: string;
  data: {
    updated_count: number;
  };
}

export async function markChatReadApi(
  chatId: number,
): Promise<MarkChatReadResponse> {
  if (!Number.isSafeInteger(chatId) || chatId <= 0) {
    throw new Error("Invalid chat ID");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized: Missing access token");
  }

  const response = await fetch(`${process.env.API}/api/chats/${chatId}/read`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: You must be signed in to mark messages read.");
  }
  if (response.status === 404) {
    throw new Error("Chat not found or you do not have access to it.");
  }
  if (!response.ok) {
    throw new Error(`Failed to mark chat messages as read (${response.status})`);
  }

  return response.json();
}