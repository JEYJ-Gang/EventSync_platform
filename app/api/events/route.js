import { NextResponse } from "next/server";
import {eventService} from "../service/eventService";
export async function GET (request ){
    try{
        const{searchParms} = new URL(request.url); 
        const page = parseInt(searchParms.get("page") || "1", 10); 
        const perPage = parseInt(searchParms.get("per_page") || "20", 10); 
        const result = await eventService.listEvents({
            page, 
            perPage,
        }); 

        return NextResponse.json(result, {status: 200}); 
    } catch(error){
        return NextResponse.json({
            code: error.code || "INTERNAL_ERROR", 
            message: error.message || "Erreur serveur", 
        },
    {status: error.status || 500}); 
    }
}