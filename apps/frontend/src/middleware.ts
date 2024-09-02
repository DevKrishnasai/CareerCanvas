import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import logger from "@careeraft/logger";
import { AuthRoutes, PublicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  logger.info("Middleware executed " + req.nextUrl.pathname);
  const hostname = req.headers.get("host") || process.env.HOST_NAME!;
  const subdomain = hostname.split(".")[0];

  const path = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isAuthApi = path.startsWith("/api/auth");
  const isPublicRoute = PublicRoutes.includes(path);
  const isAuthRoute = AuthRoutes.includes(path);

  if (hostname.split(".").length === 1) {
    logger.info("Accessing main domain" + path);

    if (
      isPublicRoute ||
      (!isLoggedIn && isAuthApi) ||
      (!isLoggedIn && isAuthRoute)
    ) {
      return NextResponse.next();
    }

    if ((isLoggedIn && isAuthRoute) || (isLoggedIn && isAuthApi)) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }
  } else if (hostname.split(".").length === 2) {
    logger.info("Accessing subdomain" + path);
    return NextResponse.rewrite(
      new URL(`/portfolio/${subdomain}`, req.nextUrl)
    );
  } else {
    logger.info("Accessing unknown domain" + path);
    return NextResponse.rewrite(new URL("/no-subdomain", req.nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
