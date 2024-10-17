import {
  clerkMiddleware,
  ClerkMiddlewareOptions,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const clerkOptions: ClerkMiddlewareOptions = {
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  afterSignInUrl: "/dashboard",
  afterSignUpUrl: "/dashboard",
};

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  return NextResponse.next();
}, clerkOptions);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
