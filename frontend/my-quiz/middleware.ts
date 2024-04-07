import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/getUser";
import { authRoutes, publicRoutes } from "./routes";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isLogged = await getUser();
  const { nextUrl } = request;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isLogged && isAuthRoute)return Response.redirect(new URL("/", request.nextUrl));
  if (!isLogged && !isPublicRoute)return Response.redirect(new URL("/login", request.nextUrl));
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
