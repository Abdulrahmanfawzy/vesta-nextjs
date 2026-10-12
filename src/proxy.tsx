import { NextResponse, type NextRequest } from "next/server"

// pages only for logged-out users (must match your (auth) folder names)
const AUTH_PAGES = ["/login", "/forgot-password", "/verify-otp", "/reset-password"]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLoggedIn = Boolean(req.cookies.get("token")?.value)
  const isAuthPage = AUTH_PAGES.includes(pathname)

  
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|session|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}