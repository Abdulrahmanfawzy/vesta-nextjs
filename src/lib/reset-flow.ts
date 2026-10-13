const KEY = "reset-flow"

type ResetFlow = {
  email?: string
  otp?: string
  resetToken?: string
}

export function getResetFlow(): ResetFlow {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}")
  } catch {
    return {}
  }
}

export function saveResetFlow(patch: ResetFlow) {
  sessionStorage.setItem(KEY, JSON.stringify({ ...getResetFlow(), ...patch }))
}

export function clearResetFlow() {
  sessionStorage.removeItem(KEY)
}