import type { NextRequest } from "next/server";
import { getUser } from "./actions/getUser";
import { authRoutes, publicRoutes } from "./routes";

export async function middleware(request: NextRequest) {

}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]

};
