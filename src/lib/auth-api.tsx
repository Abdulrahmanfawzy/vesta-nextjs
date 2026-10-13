const API_URL = "/backend"

type ApiResponse<T> = { success?: boolean; message?: string; data?: T }

async function post<T>(
  path: string,
  body: unknown,
  fallbackMessage: string
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const json = await res.json().catch(() => null)

  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? fallbackMessage)
  }

  return json
}

export function forgotPasswordRequest(values: { email: string }) {
  return post<{ otp?: string }>(
    "/auth/forgotPassword",
    values,
    "Could not send the verification code"
  )
}

export async function verifyOtpRequest(values: { email: string; code: string }) {
  const json = await post<{ reset_token?: string }>(
    "/auth/forgot-password/verify",
    values,
    "Invalid or expired code"
  )

  const resetToken = json.data?.reset_token
  if (!resetToken) throw new Error("No reset token was returned")

  return { resetToken }
}

export function resetPasswordRequest(values: {
  resetToken: string
  password: string
  confirmPassword: string
}) {
  return post<{ message?: string }>(
    "/auth/resetPassword",
    {
      reset_token: values.resetToken,
      password: values.password,
      password_confirmation: values.confirmPassword,
    },
    "Could not reset the password"
  )
}