import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes are protected
const isProtectedRoute = createRouteMatcher([
  "/doctors(.*)",
  "/onboarding(.*)",
  "/doctor(.*)",
  "/admin(.*)",
  "/video-call(.*)",
  "/appointments(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth();

    // If not logged in and trying to access protected route
    if (!userId && isProtectedRoute(req)) {
      // Redirect to Clerk sign-in page with return back URL
      const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(req.url)}`;
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.error();
  }
});

// Apply middleware only to protected routes + API/trpc routes
export const config = {
  matcher: [
    "/doctors/:path*",
    "/onboarding/:path*",
    "/doctor/:path*",
    "/admin/:path*",
    "/video-call/:path*",
    "/appointments/:path*",
    "/api/:path*",
    "/trpc/:path*",
  ],
};
