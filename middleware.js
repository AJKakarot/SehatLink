import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/doctors(.*)",
  "/onboarding(.*)",
  "/doctor(.*)",
  "/admin(.*)",
  "/video-call(.*)",
  "/appointments(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    // Redirect to Clerk sign-in page and return back to the original URL after login
    const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(req.url)}`;
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/doctors/:path*",
    "/onboarding/:path*",
    "/doctor/:path*",
    "/admin/:path*",
    "/video-call/:path*",
    "/appointments/:path*",
    "/api/:path*", // Run middleware for API routes
    "/trpc/:path*", // Run middleware for TRPC routes
  ],
};
