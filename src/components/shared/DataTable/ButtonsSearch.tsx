"use client";
import { Button } from "@/components/ui/button";
import { useUpdateSearchParams } from "@/features/refund/hooks/UpdateSearchParam";

const ButtonsSearch = (_props?: Record<string, unknown>) => {
  const STATUS_FILTERS = [
    { label: "All",       value: null       },  // null → hook deletes the param → API returns all
    { label: "Pending",   value: "pending"  },
    { label: "Rejected",  value: "rejected" },
    { label: "Completed", value: "completed"},
  ] as const;

  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const activeStatus = searchParams.get("status") ?? "";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5">
        {STATUS_FILTERS.map((filter) => (
          <Button
            key={filter.label}
            size="sm"
            className="px-8"
            variant={activeStatus === (filter.value ?? "") ? "default" : "outline"}
            onClick={() => updateSearchParams({ status: filter.value })}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ButtonsSearch;
