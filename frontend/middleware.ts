import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile"]

  // Auth routes that should redirect to dashboard if already logged in
  const authRoutes = ["/login", "/signup"]

  // Check if the path is a protected route and user is not authenticated
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if the path is an auth route and user is authenticated
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    // Redirect to login if trying to access protected route without token
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthRoute && token) {
    // Redirect to dashboard if trying to access auth routes with token
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except for static files, api routes, and _next
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}

