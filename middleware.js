import { auth } from "@clerk/nextjs/edge";
import { NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = [
  "/doctors",
  "/onboarding",
  "/doctor",
  "/admin",
  "/video-call",
  "/appointments",
];

export default function middleware(req) {
  const { userId } = auth(req);

  // Check if the request matches any protected route
  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!userId && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// Edge runtime config
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
