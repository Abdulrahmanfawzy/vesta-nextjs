"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/forms/form-field"
import { FormStatus } from "@/components/forms/form-status"
import { resetPasswordSchema, type ResetPasswordValues } from "@/schemas/auth"

export function ResetPasswordForm() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  const onSubmit = async (values: ResetPasswordValues) => {
    setError(null)
    setSuccess(null)
    try {
      // TODO: await resetPasswordAction(values)
      setSuccess("Password updated. Redirecting to login...")
      setTimeout(() => router.push("/"), 1500)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-[calc(var(--u)*32)]"
    >
      <FormField
        control={control}
        name="password"
        label="New password"
        type="password"
        placeholder="Enter your new password"
        autoComplete="new-password"
      />
      <FormField
        control={control}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
      />

      <FormStatus error={error} success={success} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto mt-[calc(var(--u)*37)] h-[max(calc(var(--u)*80),48px)] w-[calc(var(--u)*345)] min-w-40 max-w-full rounded-[calc(var(--u)*20)] bg-brand-navy font-[family-name:var(--font-open-sans)] text-[length:max(calc(var(--u)*24),16px)] font-bold text-white hover:bg-brand-navy/90"
      >
        {isSubmitting ? "Saving..." : "Reset password"}
      </Button>
    </form>
  )
}