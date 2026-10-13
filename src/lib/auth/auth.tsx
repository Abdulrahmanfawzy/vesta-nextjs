import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/schemas/auth"

declare module "next-auth" {
  interface User {
    accessToken?: string
  }
  interface Session {
    accessToken?: string
  }
}

// lets us send the backend's message to the login form
class LoginError extends CredentialsSignin {
  constructor(message: string) {
    super()
    this.code = message
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) throw new LoginError("Invalid email or password")

        const res = await fetch(`${process.env.API}/api/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed.data),
        })
        const json = await res.json().catch(() => null)

        if (!res.ok || json?.success === false) {
          throw new LoginError(json?.message ?? "Invalid email or password")
        }
        if (json?.data?.requires_2fa) {
          // TODO: handle the "login by 2fa" endpoint later
          throw new LoginError("Two-factor authentication is not supported yet")
        }

        // CHECK these field names against your Postman response
        const accessToken = json?.data?.token ?? json?.data?.access_token
        if (!accessToken) throw new LoginError("No token was returned")

        const user = json.data.user
        return {
          id: String(user?.id ?? parsed.data.email),
          name: user?.name,
          email: user?.email ?? parsed.data.email,
          accessToken,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.accessToken = user.accessToken
      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined
      return session
    },
  },
})