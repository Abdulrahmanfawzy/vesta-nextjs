"use client";
import { Button } from "@/components/ui/button";
import { useUpdateSearchParams } from "@/features/refund/hooks/UpdateSearchParam";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = [
  { label: "All", value: null }, // null → hook deletes the param → API returns all
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
  { label: "Completed", value: "completed" },
] as const;

const ButtonsSearch = (_props?: Record<string, unknown>) => {
  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const activeStatus = searchParams.get("status") ?? "";

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-1.5">
        {STATUS_FILTERS.map((filter) => {
          const isActive = activeStatus === (filter.value ?? "");
          return (
            <Button
              key={filter.label}
              size="sm"
              variant={isActive ? "default" : "outline"}
              aria-pressed={isActive}
              className={cn(
                "w-full sm:w-auto px-3 sm:px-6 lg:px-8 text-xs sm:text-sm",
              )}
              onClick={() => updateSearchParams({ status: filter.value })}
            >
              {filter.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonsSearch;