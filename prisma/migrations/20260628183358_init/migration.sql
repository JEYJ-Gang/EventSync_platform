/*
  Warnings:

  - You are about to drop the `organizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "organizer";

-- CreateTable
CREATE TABLE "Organizer" (
    "id_organizer" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id_organizer")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");
