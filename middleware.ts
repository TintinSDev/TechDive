// 📄 MUST BE NAMED: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🎯 CHANGE FUNCTION NAME TO middleware
export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES (no auth)
  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/forgot-password";

  const isPublicHome = pathname === "/";

  // Jobs listing + job details are PUBLIC
  const isPublicJobsRoute = pathname.startsWith("/dashboard/jobs");

  const isPublicRoute = isAuthPage || isPublicHome || isPublicJobsRoute;

  // 2. PROTECTED DASHBOARD ROUTES
  const isDashboardRoute =
    pathname.startsWith("/dashboard") && !isPublicJobsRoute;

  // Protect dashboard (except public jobs routes)
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. AUTH PAGE REDIRECTS
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. DEFAULT
  return NextResponse.next();
}

// 5. FIXED MATCHER (Your matcher logic is brilliant here)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
