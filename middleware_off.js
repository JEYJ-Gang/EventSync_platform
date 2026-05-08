import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req) {

    const {pathname} = req.nextUrl; 

    const publicRoutes = [
        "/api/auth", 
        "/api/events", 
        "/api/speakers"
    ]; 

    if(publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next(); 
    }
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "Unauthorized - missing token" },
            { status: 401 }
        );
    }

    const token = authHeader.replace("Bearer", "").trim();

    try {
        const decoded = verifyToken(token);

        if (!decoded || decoded.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        return NextResponse.next();
    } catch (err) {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }
}

export const config = {
    matcher: [
        "/api/admin/:path*"
    ],
};