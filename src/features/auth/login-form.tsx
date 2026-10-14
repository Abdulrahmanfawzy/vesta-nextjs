"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/forms/form-field"
import { FormStatus } from "@/components/forms/form-status"
import { loginSchema, type LoginValues } from "@/schemas/auth"

const HOME_ROUTE = "/"

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

    const res = await signIn("credentials", { ...values, redirect: false })

    if (res?.error) {
      // wrong credentials: show the backend message, stay on this page
      setServerError(res.code ?? "Invalid email or password")
      return
    }

    router.push(HOME_ROUTE)
    router.refresh()
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
          className="absolute right-0 top-full mt-[calc(var(--u)*8)] text-[length:calc(var(--u)*16)] text-muted-foreground hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <FormStatus error={serverError} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto mt-[calc(var(--u)*37)] h-[calc(var(--u)*80)] w-[calc(var(--u)*345)] max-w-full rounded-[calc(var(--u)*20)] bg-brand-navy font-[family-name:var(--font-open-sans)] text-[length:calc(var(--u)*24)] font-bold text-white hover:bg-brand-navy/90"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}