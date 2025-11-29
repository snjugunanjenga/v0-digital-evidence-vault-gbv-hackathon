import { NextResponse } from "next/server"

export default function middleware(req: Request & { nextUrl: URL; cookies: any }) {
  const cookie = req.cookies?.get?.("next-auth.session-token") ?? req.cookies?.get?.("__Secure-next-auth.session-token")
  const isLoggedIn = !!(cookie && cookie.value)
  const pathname = req.nextUrl.pathname
  const isOnDashboard = pathname.startsWith("/dashboard")
  const isOnAuth = pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/forgot-password")

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isOnAuth && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/forgot-password"],
}
