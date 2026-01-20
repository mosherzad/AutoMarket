import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/verifyToken";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value;
  const isAuth = !!token;

  const pathname = request.nextUrl.pathname;

  const publicRoutes = ["/login", "/register"];
  const isPublic =
    pathname === "/" ||
    publicRoutes.some((route) => pathname.startsWith(route));

  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    isAuth &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin")) {
    const userPayload = verifyToken(request);

    if (!userPayload || !userPayload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/cars/add/:path*",
    "/cars/my-cars/:path*",
    "/cars/favorites/:path*",
    "/api/users/profile/:path*",
  ],
};
