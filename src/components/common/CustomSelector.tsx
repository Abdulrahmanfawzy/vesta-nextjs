"use client";
import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

interface CustomSelectProps<T> {
  options: T[];
  value?: string;
  onChange: (value: string) => void;

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;

  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const CustomSelect = <T,>({
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  placeholder = "Select an option",
  disabled = false,
  className,
}: CustomSelectProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find(
    (option) => getOptionValue(option) === value
  );

  const handleSelect = (option: T) => {
    onChange(getOptionValue(option));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-lg",
            "border border-gray-200 bg-white px-4",
            "text-sm text-gray-900",
            "transition-colors",
            "hover:border-gray-300",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={cn(!selectedOption && "text-gray-400")}>
            {selectedOption
              ? getOptionLabel(selectedOption)
              : placeholder}
          </span>

          <ChevronDown
            size={18}
            className={cn(
              "text-gray-500 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) p-1"
      >                                                                            
        <div className="max-h-60 overflow-y-auto">
          {options.map((option) => {
            const optionValue = getOptionValue(option);
            const isSelected = optionValue === value;

            return (
              <button
                key={optionValue}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  "flex w-full items-center justify-between",
                  "rounded-md px-3 py-2.5 text-sm",
                  "text-left transition-colors",
                  "hover:bg-gray-100",
                  isSelected && "bg-gray-50"
                )}
              >
                <span>{getOptionLabel(option)}</span>

                {isSelected && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomSelect;

