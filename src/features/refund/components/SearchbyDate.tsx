"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/* Shared hook: the URL is the single source of truth (no useState anywhere)  */
/* -------------------------------------------------------------------------- */

function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (updates: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.delete("page"); // reset pagination whenever a filter changes

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };
}

/* -------------------------------------------------------------------------- */
/* 1) Search by Order Id / Customer  ->  ?search=...                          */
/* -------------------------------------------------------------------------- */

export function SearchInput({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const updateParams = useUpdateParams();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const value = searchParams.get("search") ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.trim();
    if (timer.current) clearTimeout(timer.current);
    // debounce so we don't push a new URL on every keystroke
    timer.current = setTimeout(() => updateParams({ search: next }), 400);
  };

  return (
    <div className={cn("relative w-full md:w-72", className)}>
      <Input
        key={value} // re-sync the input if the URL changes elsewhere (e.g. reset)
        defaultValue={value}
        onChange={handleChange}
        placeholder="Search by Order Id, Customer..."
        className="rounded-full pr-10"
      />
      <Search className="text-muted-foreground absolute right-3 top-1/2 size-4 -translate-y-1/2" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2) Filter by reason  ->  ?reason=...                                       */
/* -------------------------------------------------------------------------- */

const REASONS = [
  { value: "damaged", label: "Damaged Item" },
  { value: "wrong-item", label: "Wrong Item" },
  { value: "not-as-described", label: "Not as Described" },
  { value: "changed-mind", label: "Changed Mind" },
  { value: "other", label: "Other" },
];

export function ReasonSelect({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const updateParams = useUpdateParams();

  const value = searchParams.get("reason") ?? "all";

  return (
    <Select
      value={value}
      onValueChange={(v) => updateParams({ reason: v === "all" ? null : v })}
    >
      <SelectTrigger className={cn("w-full rounded-xl md:w-64", className)}>
        <SelectValue placeholder="All Refund Reasons" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Refund Reasons</SelectItem>
        {REASONS.map((r) => (
          <SelectItem key={r.value} value={r.value}>
            {r.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* -------------------------------------------------------------------------- */
/* 3) Date range (start + end)  ->  ?from=YYYY-MM-DD&to=YYYY-MM-DD            */
/* -------------------------------------------------------------------------- */

export function DateRangePicker({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const updateParams = useUpdateParams();

  const from = searchParams.get("date_from");
  const to = searchParams.get("date_to");

  const selected: DateRange | undefined = from
    ? { from: parseISO(from), to: to ? parseISO(to) : undefined }
    : undefined;

  const handleSelect = (range: DateRange | undefined) => {
    updateParams({
      date_from: range?.from ? format(range.from, "yyyy-MM-dd") : null,
      date_to: range?.to ? format(range.to, "yyyy-MM-dd") : null,
    });
  };

  const label = selected?.from
    ? selected.to
      ? `${format(selected.from, "MMM dd, yyyy")} - ${format(selected.to, "MMM dd, yyyy")}`
      : format(selected.from, "MMM dd, yyyy")
    : "Select date range";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between rounded-xl font-normal md:w-72",
            !selected && "text-muted-foreground",
            className
          )}
        >
          {label}
          <CalendarIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          defaultMonth={selected?.from}
          selected={selected}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}

/* -------------------------------------------------------------------------- */
/* Usage                                                                      */
/* -------------------------------------------------------------------------- */

export function ReturnsFilters() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <ReasonSelect />
      <DateRangePicker />
      <SearchInput className="md:ml-auto" />
    </div>
  );
}

/*
  Server page (read the same params to fetch data):

  // app/returns/page.tsx
  type Props = {
    searchParams: Promise<{
      search?: string;
      reason?: string;
      from?: string;
      to?: string;
    }>;
  };

  export default async function Page({ searchParams }: Props) {
    const { search, reason, from, to } = await searchParams;
    const data = await getReturns({ search, reason, from, to });
    return (
      <>
        <Suspense>
          <ReturnsFilters />
        </Suspense>
        <ReturnsTable data={data} />
      </>
    );
  }

  Setup: npx shadcn@latest add input button calendar popover select
*/