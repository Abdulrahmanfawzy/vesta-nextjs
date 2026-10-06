import { AuthCard } from "@/features/auth/auth-card"
import { OtpForm } from "@/features/auth/otp-form"

export default function Page() {
  return (
    <AuthCard title="Verify your code">
      <OtpForm />
    </AuthCard>
  )
}