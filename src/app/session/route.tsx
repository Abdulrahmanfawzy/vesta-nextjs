import { NextResponse } from "next/server"

const COOKIE = "token"

export async function POST(req: Request) {
  const { token } = await req.json().catch(() => ({}))
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 400 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE)
  return res
}