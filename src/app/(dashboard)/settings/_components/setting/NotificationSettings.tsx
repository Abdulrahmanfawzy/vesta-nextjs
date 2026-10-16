"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useRegisterDeviceToken } from "@/hooks/useRegisterDeviceToken";
import { toast } from "sonner";
import { useNotificationPreference } from "@/hooks/useNotificationPreference";
import { useDeleteDeviceToken } from "@/hooks/useDeleteDeviceToken";
const DEVICE_TOKEN_KEY = "a fire base device token";
const NotificationSettings = () => {
   const {
    enabled,
    isLoading,
    setPreference,
  } = useNotificationPreference();

  const registerMutation = useRegisterDeviceToken();
  const deleteMutation = useDeleteDeviceToken();

  const isPending =
    registerMutation.isPending || deleteMutation.isPending;

  const handleNotificationChange = async (checked: boolean) => {
    try {
      if (checked) {
        
        const deviceToken ='a fire base device token';

        if (!deviceToken) {
          toast.error("Could not get the device token.");
          return;
        }

        await registerMutation.mutateAsync(deviceToken);

        localStorage.setItem(DEVICE_TOKEN_KEY, deviceToken);
        setPreference(true);

        toast.success("Notifications enabled successfully.");
        return;
      }

      const deviceToken = localStorage.getItem(DEVICE_TOKEN_KEY);

      if (!deviceToken) {
        toast.error("Device token not found. Please try again.");
        return;
      }

      await deleteMutation.mutateAsync(deviceToken);

      localStorage.removeItem(DEVICE_TOKEN_KEY);
      setPreference(false);

      toast.success("Notifications disabled successfully.");
    } catch {
      
    }
  };

  return (
    <section className="flex w-full flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Notification Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose whether you want to receive notifications about your account.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-[#CFCFCF] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 sm:pr-6">
          <label
            htmlFor="notifications-enabled"
            className="cursor-pointer text-sm font-medium"
          >
            Enable notifications
          </label>
          <p className="mt-1 text-sm text-muted-foreground">
            Receive updates and important information.
          </p>
        </div>
        <Switch
          id="notifications-enabled"
          checked={enabled}
          onCheckedChange={handleNotificationChange}
          disabled={isLoading || isPending}
          className="shrink-0 data-[state=checked]:bg-app-primary"
          aria-label="Enable notifications"
        />
      </div>
    </section>
  );
};

export default NotificationSettings;
