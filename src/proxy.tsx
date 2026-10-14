import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"

// pages only for logged-out users (must match your (auth) folder names)
const AUTH_PAGES = ["/login", "/forgot-password", "/verify-otp", "/reset-password"]

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = Boolean(req.auth)
  const isAuthPage = AUTH_PAGES.includes(pathname)

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|backend|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}