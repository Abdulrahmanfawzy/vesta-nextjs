"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/forms/form-field"
import { FormStatus } from "@/components/forms/form-status"
import { otpSchema, type OtpValues } from "@/schemas/auth"

export function OtpForm() {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  const onSubmit = async (values: OtpValues) => {
    setError(null)
    setSuccess(null)
    try {
      // TODO: await verifyOtpAction(values)
      setSuccess("Verified successfully")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid or expired code")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <FormField
        control={control}
        name="otp"
        label="Verification code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="000000"
        className="text-center tracking-[0.5em]"
      />

      <FormStatus error={error} success={success} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto mt-4 h-12 w-full max-w-[345px] rounded-lg bg-brand-navy text-base font-semibold text-white hover:bg-brand-navy/90 sm:h-14"
      >
        {isSubmitting ? "Verifying..." : "Verify"}
      </Button>
    </form>
  )
}