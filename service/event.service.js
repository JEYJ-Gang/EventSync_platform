import { eventRepository } from "../repository/event.repository";

export const eventService ={
    async listEvents({page, perPage}){
        if(page < 1 || perPage < 1){
            throw{
                status: 422, 
                code: "UNPROCESSABLE_ENTITY", 
                message: "invalid paramters", 
            }; 
        }

        return await eventRepository.findAll({page, perPage}); 
    },
};