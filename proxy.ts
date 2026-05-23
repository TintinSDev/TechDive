import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The function export is now named "proxy" or default
export function proxy(request: NextRequest) {
  // Your routing / auth logic goes here
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
