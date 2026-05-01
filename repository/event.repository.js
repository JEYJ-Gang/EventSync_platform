import { prisma } from "@/lib/prisma";

export const eventRepository = {
  async findAll({ page, perPage }) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        skip,
        take,
        orderBy: {
          start_date: "desc",
        },
      }),
      prisma.event.count(),
    ]);

    return {
      data: events,
      total,
      page,
      per_page: perPage,
    };
  },

  async findById(id){
    return await prisma.event.findUnique({
      where: {Id_event: Number(id)}, 
      include:  {
        sessions: {
          include: {
            room : true, 
            intervenes:{
              include: {
                speaker: true, 
              },
            },
          },
        },
      },
    });
  },

  async findSchedule ({eventId, roomId, date}){
    return await prisma.session.findMany({
      where: {
        id_event: eventId, 
        ...(roomId && {id_room: parseInt(roomId)}), 
        ...(date && {
          start_time: {
            gte: new Date(date + "T00.00.00"), 
            lte: new Date(date + "T23.59.59")
          }
        })
      }, 
      include: {
        room: true, 
        intervenes: {
          include: {
            speaker: true
          }
        }
      },
      orderBy: {
        start_time: "asc"
      }
    }); 
  }
};