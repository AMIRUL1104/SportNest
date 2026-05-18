import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  // If user is logged in, session will contain user info
  // If user is NOT logged in, session will be null
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //If no session, user is not authenticated
  // Redirect to login page (/signin)
  if (!session) {
    const signinUrl = new URL("/signin", request.url);
    // Save current page URL to redirect back after login
    signinUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signinUrl);
  }

  // STEP 8: User has valid session - allow access to protected route
  return NextResponse.next();

  // return NextResponse.redirect(new URL('/home', request.url))
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/my-bookings", "/profile", "/facilities/:path*"],
};
