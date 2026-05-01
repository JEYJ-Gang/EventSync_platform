import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.organizer.create({
        data: {
            full_name: "Admin EventSync",
            email: "admin@eventsync.com",
            password_hash: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin créé !");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });