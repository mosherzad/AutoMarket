import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/verifyToken";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const localeMatch = pathname.match(/^\/(en|ckb|ar)(\/|$)/);
  const locale = localeMatch?.[1] || routing.defaultLocale;

  const pathnameWithoutLocale = pathname.replace(/^\/(en|ckb|ar)/, "") || "/";

  const token = request.cookies.get("jwtToken")?.value;
  const isAuth = !!token;

  console.log("PATH:", pathname);
  console.log("WITHOUT LOCALE:", pathnameWithoutLocale);
  console.log("JWT:", token);

  const publicRoutes = ["/login", "/register"];
  const isPublic = publicRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  const protectedRoutes = [
    "/cars/add",
    "/cars/my-cars",
    "/cars/favorites",
    "/admin",
    "/api/cars/add",
    "/api/cars/my-cars",
    "/api/cars/favorites",
    "/api/users/profile",
    "/api/admin",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  if (!isAuth && isProtected) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (pathnameWithoutLocale.startsWith("/admin")) {
    const userPayload = verifyToken(request);

    if (!userPayload || !userPayload.isAdmin) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  if (isAuth && isPublic) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (pathnameWithoutLocale.startsWith("/api")) {
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (pathnameWithoutLocale.startsWith("/api/admin")) {
      const userPayload = verifyToken(request);
      if (!userPayload || !userPayload.isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
  }

  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
