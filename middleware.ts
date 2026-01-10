// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";

// export async function middleware(request: NextRequest) {
//   const sessionCookie = getSessionCookie(request);

//   if (!sessionCookie) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin:path*"],
// };

// uncomment di bawah ini setelah pre-launching selesai
// import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
// import { env } from "./lib/env";
// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";

// const aj = arcjet({
//   key: env.ARCJET_KEY!,
//   rules: [
//     detectBot({
//       mode: "LIVE",
//       allow: [
//         "CATEGORY:SEARCH_ENGINE",
//         "CATEGORY:MONITOR",
//         "CATEGORY:PREVIEW",
//         "STRIPE_WEBHOOK"
//       ],
//     }),
//   ],
// });

// export async function authMiddleware(request: NextRequest) {
//   const sessionCookie = getSessionCookie(request);

//   if (!sessionCookie) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|api/webhook|api/xendit).*)"],
// };

// // Pass any existing middleware with the optional existingMiddleware prop
// export default createMiddleware(aj, async (request: NextRequest) => {
//   // Double safety: completely bypass Arcjet for Xendit endpoints
//   if (request.nextUrl.pathname.startsWith("/api/xendit")) {
//     // console.log("🔄 Bypassing Arcjet for Xendit:", request.nextUrl.pathname);
//     return NextResponse.next();
//   }

//   if (request.nextUrl.pathname.startsWith("/admin")) {
//     return authMiddleware(request);
//   }

//   return NextResponse.next();
// });

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const guestAllowedRoutes = [
  "/coming-soon",
  "/teach-on-selearn",
  "/_next",
  "/favicon.ico",
  "/logo-selearn.svg",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (sessionCookie) {
    return NextResponse.next();
  }

  // const isAllowed = guestAllowedRoutes.some((route) => {
  //   return pathname === route || pathname.startsWith(route + "/");
  // });
  // if (!isAllowed) {
  //   return NextResponse.redirect(new URL("/coming-soon", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
