import { AuthCard } from "@/features/auth/auth-card"
import { LoginForm } from "@/features/auth/login-form"

export default function Page() {
  return (
    <AuthCard title="Login">
      <LoginForm />
    </AuthCard>
  )
}
