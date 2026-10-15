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
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
    { label: "completed", value: "completed" },
  ] as const;

  const handleValue = (value: string) => {
    updateSearchParams({ status: value === "all" ? null : value });
  };

  const selectValue = searchParams.get("status") || "all";

  return (
    <Select value={selectValue} onValueChange={handleValue}>
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
