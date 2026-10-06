import { AuthCard } from "@/features/auth/auth-card"
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form"

export default function Page() {
  return (
    <AuthCard title="Forgot password">
      <ForgotPasswordForm />
    </AuthCard>
  )
}