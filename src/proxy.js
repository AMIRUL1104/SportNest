import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export const config = {
  matcher: ["/my-bookings", "/profile", "/facilities/:path*"],
};

export async function proxy(request) {
  const { pathname, origin, href } = request.nextUrl;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // 🔐 Not authenticated → redirect to signin
    if (!session) {
      const loginUrl = new URL("/signin", origin);

      loginUrl.searchParams.set("callbackUrl", href);

      return NextResponse.redirect(loginUrl);
    }

    // ✅ Authenticated → allow access
    return NextResponse.next();
  } catch (error) {
    // 🧯 Safety fallback (avoid breaking app)
    console.error("Middleware auth error:", error);

    const fallbackUrl = new URL("/signin", origin);
    return NextResponse.redirect(fallbackUrl);
  }
}
