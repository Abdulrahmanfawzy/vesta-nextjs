"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUSES } from "../../../features/returns/constants/Constants";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
const SelectFilter = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  function handelURLParam(key: string, value: string) {
    
    const params = new URLSearchParams(searchParam.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }
  const handelChangedURL = (value: string) => {
    handelURLParam("status", value);
  };
   const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
  ] as const;
  return (
    <Select
      value={searchParam.get("status") || ""}
      onValueChange={handelChangedURL}
    >
      <SelectTrigger className="h-10 w-[180px] rounded-lg bg-white text-sm text-muted-foreground">
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

export default SelectFilter;
