"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SearchParamUpdates = Record<string, string | null>;

export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (updates: SearchParamUpdates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      router.replace(url, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { updateSearchParams, searchParams };
}
