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
  const param = searchParams.get("status") ?? "";
  // console.log(param);

  const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
    { label: "refunded", value: "refunded" },
    { label: "cancelled", value: "cancelled" },
    { label: "inprogress", value: "inprogress" },
    { label: "closed", value: "closed" },
    { label: "in_transit", value: "in_transit" },
    { label: "approved", value: "approved" },
  ] as const;
  const handelValue = (value: string) => {
    updateSearchParams({
      status: value,
    });
  };
  return (
    <Select
      value={searchParams.get("status") || ""}
      onValueChange={handelValue}
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
