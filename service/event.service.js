
import { eventRepository } from "../repository/event.repository";

function mapEvent(event){
    const now = new Date();

    return {
        id: event.id_event,
        title: event.title,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        location: event.location,

        sessions: (event.sessions || []).map((s) => ({
            id: s.id_session,
            title: s.title,
            description: s.description,
            start_time: s.start_time,
            end_time: s.end_time,

            is_live:
                new Date(s.start_time) <= now &&
                new Date(s.end_time) >= now,

            room: s.room
                ? {
                    id: s.room.id_room,
                    name: s.room.name,
                }
                : null,

            speakers: (s.intervenes || []).map((i) => ({
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
        const parseId = Number(id); 
        if(isNaN(parseId)) return null; 

        return eventRepository.findById(parseId)
        },
  

    async getEventSchedule({eventId, roomId, date}){
        if(isNaN(eventId)){
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
            end_time: session.end_time, 
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
    },

    async createEvent(payload) {
        if (!payload.title || !payload.start_date || !payload.end_date) {
            throw {
                status: 422,
                code: "INVALID_DATA",
                message: "Champs obligatoires manquants",
            };
        }

        return await eventRepository.createEvent(payload);
    },

    async deleteEvent(id) {
        if (!id) {
            throw {
                status: 422,
                code: "INVALID_ID",
                message: "id requis",
            };
        }

        const event = await eventRepository.findById(id);

        if (!event) {
            throw {
                status: 404,
                code: "NOT_FOUND",
                message: "Event introuvable",
            };
        }

        return await eventService.deleteEvent(id);
    }
};