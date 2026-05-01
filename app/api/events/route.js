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

