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
        <div className="flex flex-col gap-3">
          <Label htmlFor={fieldId} className="text-xl font-normal sm:text-2xl">
            {label}
          </Label>
          <Input
            {...inputProps}
            {...field}
            id={fieldId}
            className={cn(
              "h-14 rounded-xl border-0 bg-brand-field px-5 text-base sm:h-16 md:text-lg",
              className
            )}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${fieldId}-error` : undefined}
          />
          {fieldState.error && (
            <p id={`${fieldId}-error`} role="alert" className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}