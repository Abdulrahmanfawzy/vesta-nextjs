"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormStatus } from "@/components/forms/form-status"
import { otpSchema, type OtpValues } from "@/schemas/auth"
import { verifyOtpRequest } from "@/lib/auth-api"
import { getResetFlow, saveResetFlow } from "@/lib/reset-flow"

const OTP_LENGTH = 6

const toDigits = (value: string) =>
  Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "")

function OtpBoxes({
  value,
  onChange,
  invalid,
}: {
  value: string
  onChange: (value: string) => void
  invalid: boolean
}) {
  const [digits, setDigits] = React.useState<string[]>(() => toDigits(value))
  const [syncedValue, setSyncedValue] = React.useState(value)
  const refs = React.useRef<Array<HTMLInputElement | null>>([])

  // the value changed from outside (e.g. the code was auto-filled): sync the boxes
  if (value !== syncedValue) {
    setSyncedValue(value)
    if (value !== digits.join("")) setDigits(toDigits(value))
  }

  React.useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  const update = (next: string[]) => {
    setDigits(next)
    onChange(next.join(""))
  }

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[i] = digit
    update(next)
    if (digit && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus()
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus()
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
    if (!pasted) return
    update(toDigits(pasted))
    refs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  return (
    <div className="flex justify-center gap-[calc(var(--u)*16)]">
      {digits.map((digit, i) => (
        <Input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          aria-label={`Digit ${i + 1}`}
          aria-invalid={invalid}
          className="size-[max(calc(var(--u)*90),44px)] rounded-[calc(var(--u)*20)] border-0 bg-brand-field p-0 text-center font-[family-name:var(--font-open-sans)] text-[length:max(calc(var(--u)*36),20px)] md:text-[length:max(calc(var(--u)*36),20px)]"
        />
      ))}
    </div>
  )
}

export function OtpForm() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  // opened without going through "forgot password": send the user back.
  // otherwise auto-fill the code if the dev backend returned one.
  React.useEffect(() => {
    const { email, otp } = getResetFlow()
    if (!email) {
      router.replace("/forgot-password")
      return
    }
    if (otp) setValue("otp", otp, { shouldValidate: true })
  }, [router, setValue])

  const onSubmit = async (values: OtpValues) => {
    setError(null)

    const { email } = getResetFlow()
    if (!email) {
      router.replace("/forgot-password")
      return
    }

    try {
      const { resetToken } = await verifyOtpRequest({
        email,
        code: values.otp,
      })

      saveResetFlow({ resetToken, otp: undefined })
      router.push("/reset-password")
    } catch (e) {
      // wrong or expired code: show the message, stay on this page
      setError(e instanceof Error ? e.message : "Invalid or expired code")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-[calc(var(--u)*32)]"
    >
      <Controller
        control={control}
        name="otp"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-[calc(var(--u)*16)] font-[family-name:var(--font-open-sans)]">
            <Label className="justify-center text-[length:max(calc(var(--u)*28),16px)] font-normal leading-[calc(var(--u)*42)]">
              Verification code
            </Label>
            <OtpBoxes
              value={field.value}
              onChange={field.onChange}
              invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <p
                role="alert"
                className="text-center text-[length:max(calc(var(--u)*16),12px)] text-destructive"
              >
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <FormStatus error={error} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto mt-[calc(var(--u)*37)] h-[max(calc(var(--u)*80),48px)] w-[calc(var(--u)*345)] min-w-40 max-w-full rounded-[calc(var(--u)*20)] bg-brand-navy font-[family-name:var(--font-open-sans)] text-[length:max(calc(var(--u)*24),16px)] font-bold text-white hover:bg-brand-navy/90"
      >
        {isSubmitting ? "Verifying..." : "Verify"}
      </Button>
    </form>
  )
}