-- CreateTable
CREATE TABLE "organizer" (
    "id_organizer" SERIAL NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizer_pkey" PRIMARY KEY ("id_organizer")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizer_email_key" ON "organizer"("email");
