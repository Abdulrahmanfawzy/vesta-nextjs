// step 4 to open notification
"use client";

import { useMutation } from "@tanstack/react-query";
import { registerDeviceTokenAction } from "@/actions/notification.actions";

export function useRegisterDeviceToken() {
  return useMutation({
    mutationFn: (deviceToken: string) =>
      registerDeviceTokenAction(deviceToken),
  });
}