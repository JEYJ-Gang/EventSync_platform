import { NextResponse } from "next/server";
import { eventService } from "../../../../service/event.service";
import { verifyToken } from "@/lib/jwt";

export async function GET(request, {params}){
    try{
        const {eventId} = params; 
        const event = await eventService.getEventById(eventId);

        return NextResponse.json(event, {status: 200}); 
    } catch(error){
        return NextResponse.json({
            code: error.code || "INTERNAL_ERROR", 
            message: error.message || "erreur du serveur", 
        }, 
    {status: error.status || 500}); 
    }
}