"use client";
import { Button } from "@/components/ui/button";
import { useUpdateSearchParams } from "@/features/refund/hooks/UpdateSearchParam";
const ButtonsSearch = () => {
  const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
  ] as const;
  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const activeStatus = searchParams.get("status") || "";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5">
        {STATUS_FILTERS.map((filter) => (
          <Button
            key={filter.label}
            size="sm"
            className={` ${
              filter.label.includes("Pending") ||
              filter.label.includes("Rejected") ||
              filter.label.includes("Accepted") ||
              filter.label.includes("All")
                ? "px-8"
                : ""
            }`}
            variant={activeStatus === filter.value ? "default" : "outline"}
            onClick={() => updateSearchParams({ status: filter.value || null })}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default ButtonsSearch;
