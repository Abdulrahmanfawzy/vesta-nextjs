import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
})

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{4}$/, "Enter the 4-digit code"),
})

export type LoginValues = z.infer<typeof loginSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
export type OtpValues = z.infer<typeof otpSchema>