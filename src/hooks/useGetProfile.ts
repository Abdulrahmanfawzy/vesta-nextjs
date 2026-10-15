"use client";

import { getProfileAction } from "@/actions/profile";
import { useQuery } from "@tanstack/react-query";


export const profileKeys = {
  all: ["profile"] as const,
  details: () => [...profileKeys.all, "details"] as const,
};

export function useGetProfile() {
  return useQuery({
    queryKey: profileKeys.details(),
    queryFn: getProfileAction,
  });
}