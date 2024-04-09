import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/getUser";
import { authRoutes, publicRoutes } from "./routes";

export async function middleware(request: NextRequest) {
  const isLogged = await getUser();
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const isDynamicUserProfileRoute = /^\/user\/[a-zA-Z0-9]+$/.test(pathname);

  const isPublicRoute = publicRoutes.includes(pathname) || isDynamicUserProfileRoute;
  const isAuthRoute = authRoutes.includes(pathname);

  if (isLogged && isAuthRoute) return Response.redirect(new URL("/", request.nextUrl));
  if (!isLogged && !isPublicRoute) return Response.redirect(new URL("/login", request.nextUrl));

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
