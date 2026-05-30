import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/forgot-password";

  const isPublicHome = pathname === "/";

  const isPublicJobsRoute = pathname.startsWith("/dashboard/jobs");

  const isPublicRoute = isAuthPage || isPublicHome || isPublicJobsRoute;

  const isDashboardRoute =
    pathname.startsWith("/dashboard") && !isPublicJobsRoute;

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
