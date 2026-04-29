import { getEventsPaginated } from "../repository/event.repository";

export async function listEvents(page, perPage){
    const {data, total} = await getEventsPaginated(page, perPage)
    return{
        data, 
        total, 
        page, 
        perPage : perPage
    }
}