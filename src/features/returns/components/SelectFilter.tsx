"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { STATUSES } from "../constants/Constants";
const SelectFilter = () => {
  const [status, setStatus] = useState<string>("all");

  return (
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="h-10 w-[180px] rounded-lg bg-white text-sm text-muted-foreground">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s.id} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
