import { NextResponse } from "next/server";

export function middleware(req) {

    const pathname = req.nextUrl.pathname;

    if (!pathname.startsWith("/api/admin")) {
        return NextResponse.next();
    }

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return NextResponse.json(
            {
                message: "Unauthorized - missing token"
            },
            {
                status: 401
            }
        );
    }

    return NextResponse.next();
}