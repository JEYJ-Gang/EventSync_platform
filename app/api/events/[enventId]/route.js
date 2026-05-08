import { NextResponse } from "next/server";
import { eventService } from "../../../../service/event.service";

export async function GET(request, {params}){
    try{
        const { eventId } = params;
        const event = await eventService.getEventById(eventId);
        if (!event) {
            return NextResponse.json(
                {
                    code: "NOT_FOUND",
                    message: "evenement introuvable"
                },
                { status: 404 }
            );
        }
        return NextResponse.json(event, { status: 200 });
    }
    catch(error){
        console.error(error); 
        return NextResponse.json(
            {
                code: "INTERNAL_ERROR",
                message: "erreur serveur", 
            }, 
            {status: 500}
        )
    } 
}

