
"use client";

import { deleteDeviceTokenAction } from "@/actions/notification.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useDeleteDeviceToken() {
  return useMutation({
    mutationFn: (deviceToken: string) =>
      deleteDeviceTokenAction(deviceToken),

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to disable notifications.",
      );
    },
  });
}
