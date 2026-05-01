// éviter de créer plusieurs connexions prisa
// éviter new PrismaClient(); à chaque reload

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma =
    globalForPrisma.prisma || new PrismaClient(); // on réutilise le même client prisma
    