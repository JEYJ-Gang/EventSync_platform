import { NextResponse } from "next/server";
import { eventService } from "../../../../../service/event.service";

export async function GET(request, {params}){
    try{
        const eventId = parseInt(params.id); 
        const {searchParams} = new URL(request.url); 
        const roomId= searchParams.get("room_id"); 
        const date = searchParams.get("date"); 
        const result = await eventService.getEventSchedule({
            eventId, roomId, date
        }); 

        return NextResponse.json(result); 
    } catch(error){
        return NextResponse.json(
            {
                code: error.code || "INTERNAL_ERROR", 
                message: error.message
            }, 
            {
                status: error.status || 500
            }
        );
    }
}