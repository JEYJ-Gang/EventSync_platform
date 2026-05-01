import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect(); // 🔥 important pour debug

    const events = await prisma.event.findMany();

    console.log("✅ Events:", events);
  } catch (error) {
    console.error("❌ ERREUR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();