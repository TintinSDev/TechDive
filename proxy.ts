import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't need authentication
  const publicPaths = [
    "/",
    "/jobs",
    "/pricing",
    "/login",
    "/signup",
    "/forgot-password",
  ];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Dashboard paths that require authentication
  const dashboardPaths = [
    "/dashboard",
    "/profile",
    "/preferences",
    "/settings",
    "/applications",
  ];
  const isDashboardPath = dashboardPaths.some((path) =>
    pathname.startsWith(path),
  );

  // Check authentication
  if (isDashboardPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((pathname === "/login" || pathname === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
