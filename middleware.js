import { NextResponse } from "next/server";

export function middleware(req) {
    const authHeader = req.headers.get("authorization");

    const isLoginRoute = req.nextUrl.pathname === "/api/auth/login";

    if (isLoginRoute) {
        return NextResponse.next();
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "Unauthorized - missing token" },
            { status: 401 }
        );
    }

    return NextResponse.next();
}
