
import "server-only";

import { getToken } from "@/lib/get-token";
import type {
  ContactMessagePayload,
  ContactMessageResponse,
} from "@/types/contact-message.types";

export async function sendContactMessage(
  payload: ContactMessagePayload
): Promise<ContactMessageResponse> {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API}/api/contact-messages`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to send contact message (${response.status})`
    );
  }

  return response.json();
}
