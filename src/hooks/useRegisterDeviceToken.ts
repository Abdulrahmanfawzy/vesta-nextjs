// step 4 to open notification
"use client";

import { useMutation } from "@tanstack/react-query";
import { registerDeviceTokenAction } from "@/actions/notification.actions";
import { toast } from "sonner";

export function useRegisterDeviceToken() {
  return useMutation({
    mutationFn: (deviceToken: string) =>
      registerDeviceTokenAction(deviceToken),

    onError:(error)=>{
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to enable notifications.",
      );

    }
  });
}