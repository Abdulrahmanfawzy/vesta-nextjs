
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const notificationPreferenceKey = ["notification-preference"] as const;

const STORAGE_KEY = "notifications-enabled";

export function useNotificationPreference() {
  const queryClient = useQueryClient();

  const { data: enabled = false, isLoading } = useQuery({
    queryKey: notificationPreferenceKey,
    queryFn: () => {
      return localStorage.getItem(STORAGE_KEY) === "true";
    },
    staleTime: Infinity,
  });

  const setPreference = (value: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(value));

    queryClient.setQueryData(
      notificationPreferenceKey,
      value,
    );
  };

  return { enabled, isLoading, setPreference };
}
