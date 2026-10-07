"use client"

import * as React from "react"
import { cn } from "cn"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
} & Omit<React.ComponentProps<"input">, "name" | "defaultValue" | "value" | "onChange">

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  id,
  className,
  ...inputProps
}: FormFieldProps<T>) {
  const fieldId = id ?? name

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-[calc(var(--u)*6)] font-[family-name:var(--font-open-sans)]">
          <Label
            htmlFor={fieldId}
            className="text-[length:max(calc(var(--u)*28),16px)] font-normal leading-[calc(var(--u)*42)]"
          >
            {label}
          </Label>
          <Input
            {...inputProps}
            {...field}
            id={fieldId}
            className={cn(
              "h-[max(calc(var(--u)*65),44px)] rounded-[calc(var(--u)*20)] border-0 bg-brand-field px-[calc(var(--u)*29)] py-0 text-[length:max(calc(var(--u)*20),14px)] md:text-[length:max(calc(var(--u)*20),14px)]",
              className
            )}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${fieldId}-error` : undefined}
          />
          {fieldState.error && (
            <p
              id={`${fieldId}-error`}
              role="alert"
              className="text-[length:max(calc(var(--u)*16),12px)] text-destructive"
            >
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}