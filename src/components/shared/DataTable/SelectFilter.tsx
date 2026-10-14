"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/features/refund/hooks/UpdateSearchParam";

const SelectFilter = () => {
  const { searchParams, updateSearchParams } = useUpdateSearchParams();

  const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
    { label: "Refunded", value: "refunded" },
    { label: "Cancelled", value: "cancelled" },
    { label: "In Progress", value: "inprogress" },
    { label: "Closed", value: "closed" },
    { label: "In Transit", value: "in_transit" },
    { label: "Approved", value: "approved" },
  ] as const;

  const handleValue = (value: string) => {
    updateSearchParams({ status: value || null });
  };

  return (
    <Select
      value={searchParams.get("status") || ""}
      onValueChange={handleValue}
    >
      <SelectTrigger className="h-10 w-45 rounded-lg bg-white text-sm text-muted-foreground">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        {STATUS_FILTERS.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SelectFilter };
