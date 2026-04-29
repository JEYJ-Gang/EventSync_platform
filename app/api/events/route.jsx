import { listEvents } from "../../../lib/service/event.service"

export async function Get(request){
    const { searchParams } = new URL(request.url)

  const page = Math.max(parseInt(searchParams.get('page')) || '1')
  const perPage = Math.min(parseInt(searchParams.get('per_page')) || '20')

  const result = await listEvents(page, perPage)

  return Response.json(result)
}