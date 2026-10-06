"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/forms/form-field"
import { FormStatus } from "@/components/forms/form-status"
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/schemas/auth"
import router from "next/dist/shared/lib/router/router"
import { useRouter } from "next/dist/client/components/navigation"

export function ForgotPasswordForm() {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)
   const router = useRouter()

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
      // TODO: await forgotPasswordAction(values)
      // setSuccess("If this email exists, a verification code has been sent.")
      router.push("/verify-otp")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
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
        disabled={isSubmitting}
        className="mx-auto mt-4 h-12 w-full max-w-[345px] rounded-lg bg-brand-navy text-base font-semibold text-white hover:bg-brand-navy/90 sm:h-14"
      >
        {isSubmitting ? "Sending..." : "Send code"}
      </Button>

      <Link href="/" className="text-center text-sm text-muted-foreground hover:underline">
        Back to login
      </Link>
    </form>
  )
}