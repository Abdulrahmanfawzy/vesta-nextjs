const API_URL = "/api"

export type LoginPayload = { email: string; password: string }

export async function loginRequest(values: LoginPayload) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })

  const json = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(json?.message ?? "Invalid email or password")
  }

  return json
}

export async function forgotPasswordRequest(values: { email: string }) {
  const res = await fetch(`${API_URL}/auth/forgotPassword`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })

  const json = await res.json().catch(() => null)

  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? "Could not send the verification code")
  }

  return json
}

export async function saveSession(token: string) {
  await fetch("/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
}

export async function clearSession() {
  await fetch("/session", { method: "DELETE" })
}