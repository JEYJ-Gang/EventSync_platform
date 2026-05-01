
import { eventRepository } from "../repository/event.repository";

function mapEvent(event){
    const now = new Date(); 
    return{
        id: event.id_event, 
        title: event.title, 
        description: event.description, 
        start_date: event.start_date, 
        end_date: event.end_date, 
        location: event.location, 
        sessions: event.sessions.map((s) => ({
            id: s.id_session, 
            title: s.title, 
            description: s.description, 
            start_time: s.start_time, 
            end_time: s.end_time, 
            is_live: 
                new Date(s.start_time)  <= now &&
                new Date(s.end_time) >= now, 
            room: {
                id: s.room.id_room, 
                name: s.room.name, 
            }, 
            speakers: s.intervenes.map((i)=> ({
                id: i.speaker.id_speaker,
                full_name: `${i.speaker.first_name} ${i.speaker.last_name}`, 
                photo_url: i.speaker.photo_url, 
            })), 

        })),
    }; 
}

export const eventService ={
    async listEvents({page, perPage}){
        if(page < 1 || perPage < 1){
            throw{
                status: 422, 
                code: "UNPROCESSABLE_ENTITY", 
                message: "invalid paramters", 
            }; 
        }

        const result=  await eventRepository.findAll({page, perPage}); 
        return{
            ...result, 
            data: result.data.map(mapEvent)
        }
    },

    async getEventById(id){
        if(!id){
            throw{
                status: 422,
                code: "Invalid_Id", 
                message: "id requis", 
            };
        }
        const event=  await eventRepository.findById(id); 
        return mapEvent(event); 
    },

    async getEventSchedule({eventId, roomId, date}){
        if(!eventId){
            throw{
                status: 422, 
                code: "UNPROCESSABLE_ENTITY", 
                message: "Invalid eventId"
            }; 
        }
        const sessions = await eventRepository.findSchedule({
            eventId, 
            roomId, 
            date
        }); 
        if(!sessions.length){
            throw{
                status: 404, 
                code: "NOT_FOUND", 
                message: "No sessions found"
            }; 
        }

        const now = new Date(); 
        const mapped = sessions.map(session => ({
            id: session.id_session, 
            title: session.title, 
            start_time: session.start_time, 
            end_time: session.end_date, 
            is_live: now >= session.start_time && now <= session.end_time, 
            room: {
                id: session.room.id_room, 
                name: session.room.name
            }, 
            speakers: session.intervenes.map(i=>({
                id: i.speaker.id_speaker, 
                full_name: `${i.speaker.first_name} ${i.speaker.last_name}`, 
                photo_url: i.speaker.photo_url
            }))
        })); 

        return {
            data: mapped, 
            total: mapped.length
        }; 
    }
};