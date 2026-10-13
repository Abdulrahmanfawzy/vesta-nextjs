"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/forms/form-field"
import { FormStatus } from "@/components/forms/form-status"
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/schemas/auth"
import { forgotPasswordRequest } from "@/lib/auth-api"
import { clearResetFlow, saveResetFlow } from "@/lib/reset-flow"

export function ForgotPasswordForm() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (values: ForgotPasswordValues) => {
    setError(null)
    setSuccess(null)
    try {
      const json = await forgotPasswordRequest(values)

      // DEV ONLY: the test backend returns the code in the response, so we
      // auto-fill it. In a production build this is never used.
      const devOtp =
        process.env.NODE_ENV !== "production" ? json.data?.otp : undefined

      clearResetFlow()
      saveResetFlow({ email: values.email, otp: devOtp })

      setSuccess(json.message ?? "Verification code sent.")
      setTimeout(() => router.push("/verify-otp"), 1500)
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
        name="email"
        label="Email"
        type="email"
        placeholder="Please enter your email"
        autoComplete="email"
      />

      <FormStatus error={error} success={success} />

      <Button
        type="submit"
        disabled={isSubmitting || Boolean(success)}
        className="mx-auto mt-[calc(var(--u)*37)] h-[calc(var(--u)*80)] w-[calc(var(--u)*345)] max-w-full rounded-[calc(var(--u)*20)] bg-brand-navy font-[family-name:var(--font-open-sans)] text-[length:calc(var(--u)*24)] font-bold text-white hover:bg-brand-navy/90"
      >
        {isSubmitting ? "Sending..." : "Send code"}
      </Button>

      <Link
        href="/login"
        className="text-center text-[length:calc(var(--u)*16)] text-muted-foreground hover:underline"
      >
        Back to login
      </Link>
    </form>
  )
}