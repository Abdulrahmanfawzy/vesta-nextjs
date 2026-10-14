
"use server";

import { sendContactMessage } from "@/api/contact-messages.api";
import type { ContactMessagePayload } from "@/types/contact-message.types";

export async function sendContactMessageAction(payload: ContactMessagePayload) {
  try {
    return await sendContactMessage(payload);
  } catch (error) {
    console.error("Send contact message error:", error);

    return {
      success: false,
      message: "Failed to send your message. Please try again.",
      data: null,
    };
  }
}
