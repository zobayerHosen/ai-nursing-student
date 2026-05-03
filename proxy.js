import { NextResponse } from "next/server";
import { ROUTE_PATH } from "./constants/route-naming";

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // Read auth token from cookies
    const tokenName = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
    const token = tokenName
        ? request.cookies.get(tokenName)?.value
        : undefined;

    // Public pages (should NOT be accessible when logged in)
    const publicPaths = [
        "/auth",
        "/auth/register",
        "/auth/profile-setup",
        "/auth/review-and-finish",
        "/auth/forget-password",
        "/auth/new-password"
    ];

    const isPublicPath = publicPaths.includes(pathname);

    // All /stemrn/* are protected
    const isProtectedPath = pathname.startsWith("/dashboard");

    /**
     * 🔒 If NOT logged in and accessing protected route
     * → redirect to signin
     */
    if (!token && isProtectedPath) {
        const loginUrl = new URL("/auth", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    /**
     * 🚫 If logged in and accessing public/auth pages
     * → redirect to NEWS
     */
    if (token && isPublicPath) {
        return NextResponse.redirect(
            new URL(ROUTE_PATH.DASHBOARD, request.url)
        );
    }

    return NextResponse.next();
}

/**
 * Middleware matcher
 * ⚠️ MUST include public pages or redirect won’t work
 */
export const config = {
    matcher: [
        "/",
        "/auth",
        "/auth/register",
        "/auth/profile-setup",
        "/auth/review-and-finish",
        "/auth/forget-password",
        "/auth/new-password",

        "/dashboard/:path*"
    ],
};