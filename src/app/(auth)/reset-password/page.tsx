import { AuthCard } from "@/features/auth/auth-card"
import { ResetPasswordForm } from "@/features/auth/reset-password-form"

export default function Page() {
  return (
    <AuthCard title="Reset password">
      <ResetPasswordForm />
    </AuthCard>
  )
}