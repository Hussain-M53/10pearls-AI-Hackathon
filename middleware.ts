import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
// import { getTenantBySubdomain, getTenantByCustomDomain } from "@/lib/multi-tenant"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname, hostname } = url
  console.log(pathname);
  console.log(hostname);

  // Skip for static files and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Check if this is a custom domain
  const isCustomDomain =
    !hostname.includes("localhost") && !hostname.includes("vercel.app") && !hostname.includes(".app")

  if (isCustomDomain) {
    console.log('custom domain');
    // const tenant = await getTenantByCustomDomain(hostname)

    if (false) {
      // Set tenant cookie
      const response = NextResponse.next()
      response.cookies.set("tenantId", '67fbd8590db8bca484651d67', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
      return response
    }
  } else {
    // Check for subdomain
    const subdomain = hostname.split(".")[0]
    console.log('sub domain:'  + subdomain);
    // if (subdomain !== "www" && subdomain !== "localhost" && subdomain !== "app") {
      // const tenant = await getTenantBySubdomain(subdomain)
      console.log('sub domain');
      // if (tenant) {
        // Set tenant cookie
        const response = NextResponse.next()
        response.cookies.set("tenantId", '67fbd8590db8bca484651d67', {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        })
        return response
      // } else {
      //   // Redirect to main site if subdomain doesn't exist
      //   url.hostname = hostname.replace(`${subdomain}.`, "")
      //   return NextResponse.redirect(url)
      // }
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
