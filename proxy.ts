import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  // Public paths that don't need authentication
  const publicPaths = [
    "/",

    "/dashboard/jobs",
    "/dashboard/pricing",
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
  ];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  // Dashboard paths that require authentication
  const dashboardPaths = [
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/preferences",
    "/dashboard/settings",
    "/dashboard/applications",
  ];
  const isDashboardPath = dashboardPaths.some((path) =>
    pathname.startsWith(path),
  );
  // Check authentication
  if (isDashboardPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if ((pathname === "/auth/login" || pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
