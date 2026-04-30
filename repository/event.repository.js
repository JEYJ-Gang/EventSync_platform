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
};