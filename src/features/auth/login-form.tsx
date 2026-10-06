"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/forms/form-field"
import { FormStatus } from "@/components/forms/form-status"
import { loginSchema, type LoginValues } from "@/schemas/auth"

export function LoginForm() {
  const router = useRouter()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values: LoginValues) => {
    setServerError(null)
    try {
       
      router.push("/verify-otp")
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8 sm:gap-10">
      <FormField
        control={control}
        name="email"
        label="Email"
        type="email"
        placeholder="Please enter your email"
        autoComplete="email"
      />

      <div className="relative">
        <FormField
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        <Link
          href="/forgot-password"
          className="absolute right-0 top-full mt-2 text-sm text-muted-foreground hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <FormStatus error={serverError} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto h-14 w-full max-w-[345px] rounded-xl bg-brand-navy text-lg font-semibold text-white hover:bg-brand-navy/90 sm:mt-[30px] sm:h-20"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}