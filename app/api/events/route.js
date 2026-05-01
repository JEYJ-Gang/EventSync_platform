import { NextResponse } from "next/server";
import {eventService} from "../../../service/event.service";
export async function GET (request ){
    try{
        const{searchParams} = new URL(request.url); 
        const page = parseInt(searchParams.get("page") || "1"); 
        const per_page = parseInt(searchParams.get("per_page") || "20"); 
        const result = await eventService.listEvents({page, per_page}); 

        return NextResponse.json(result, {status: 200});
    } catch(error){
        console.error(error); 

        return NextResponse.json({
            code: error.code || "INTERNAL_ERROR",
            message: error.message || "Erreur serveur",
        },
    {status: error.status || 500});
    }
}

export async function DELETE(req, { params }) {
    console.log("🔥 DELETE ROUTE HIT");
    try {
        const authHeader = req.headers.get("authorization");

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return NextResponse.json(
                { message: "Missing token" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);

        const decoded = verifyToken(token);

        console.log("DECODED:", decoded);

        if (!decoded || decoded.role?.trim().toUpperCase() !== "ADMIN") {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const { eventId } = params;

        await eventService.deleteEvent(Number(eventId));

        return NextResponse.json(
            { message: "Event deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR:", error);
        return NextResponse.json(
            {
                code: "INTERNAL_ERROR",
                message: "Erreur serveur",
            },
            { status: 500 }
        );
    }
}