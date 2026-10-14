
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { sendContactMessageAction } from "@/actions/contact-messages.action";
import type { ContactMessagePayload } from "@/types/contact-message.types";

export function useSendContactMessage() {
  return useMutation({
    mutationFn: async (payload: ContactMessagePayload) => {
      const result = await sendContactMessageAction(payload);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: (result) => {
      toast.success(result.message);
    },

    onError: (error) => {
      toast.error(error.message || "Failed to send your message");
    },
  });
}
