import { NextResponse } from "next/server";

export function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Gestion des requêtes OPTIONS (préflight CORS)
    if (req.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }

    // Middleware d'authentification existant
    if (pathname.startsWith("/api/admin")) {
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Unauthorized - missing token" },
                { status: 401 }
            );
        }
    }

    const response = NextResponse.next();

    // Ajouter les headers CORS à toutes les routes API
    if (pathname.startsWith("/api")) {
        response.headers.set(
            "Access-Control-Allow-Origin",
            "http://localhost:5173"
        );
        response.headers.set(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        response.headers.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
    }

    return response;
}