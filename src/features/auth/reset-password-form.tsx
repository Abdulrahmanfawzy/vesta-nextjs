"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/forms/form-field"
import { FormStatus } from "@/components/forms/form-status"
import { resetPasswordSchema, type ResetPasswordValues } from "@/schemas/auth"
import { resetPasswordRequest } from "@/lib/auth-api"
import { clearResetFlow, getResetFlow } from "@/lib/reset-flow"

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

  // no verified code: this page can't be used, go back to the start
  React.useEffect(() => {
    if (!getResetFlow().resetToken) router.replace("/forgot-password")
  }, [router])

  const onSubmit = async (values: ResetPasswordValues) => {
    setError(null)
    setSuccess(null)

    const { resetToken } = getResetFlow()
    if (!resetToken) {
      router.replace("/forgot-password")
      return
    }

    try {
      const json = await resetPasswordRequest({
        resetToken,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })

      clearResetFlow()
      setSuccess(json.data?.message ?? json.message ?? "Password reset successfully.")
      setTimeout(() => router.push("/login"), 1500)
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
        disabled={isSubmitting || Boolean(success)}
        className="mx-auto mt-[calc(var(--u)*37)] h-[calc(var(--u)*80)] w-[calc(var(--u)*345)] max-w-full rounded-[calc(var(--u)*20)] bg-brand-navy font-[family-name:var(--font-open-sans)] text-[length:calc(var(--u)*24)] font-bold text-white hover:bg-brand-navy/90"
      >
        {isSubmitting ? "Saving..." : "Reset password"}
      </Button>
    </form>
  )
}