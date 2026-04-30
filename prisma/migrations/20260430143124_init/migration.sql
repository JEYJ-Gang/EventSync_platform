-- CreateTable
CREATE TABLE "organizer" (
    "id_organizer" SERIAL NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "organizer_pkey" PRIMARY KEY ("id_organizer")
);

-- CreateTable
CREATE TABLE "event" (
    "id_event" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(150),

    CONSTRAINT "event_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "room" (
    "id_room" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "capacity" INTEGER,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id_room")
);

-- CreateTable
CREATE TABLE "speaker" (
    "id_speaker" SERIAL NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "photo_url" TEXT,
    "biography" TEXT,
    "external_link" TEXT,

    CONSTRAINT "speaker_pkey" PRIMARY KEY ("id_speaker")
);

-- CreateTable
CREATE TABLE "session" (
    "id_session" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "start_time" TIME(6) NOT NULL,
    "end_time" TIME(6) NOT NULL,
    "max_participant" INTEGER,
    "id_room" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id_session")
);

-- CreateTable
CREATE TABLE "question" (
    "id_question" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author_name" VARCHAR(50),
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "creation_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_session" INTEGER,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id_question")
);

-- CreateTable
CREATE TABLE "intervene" (
    "id_session" INTEGER NOT NULL,
    "id_speaker" INTEGER NOT NULL,

    CONSTRAINT "intervene_pkey" PRIMARY KEY ("id_session","id_speaker")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizer_email_key" ON "organizer"("email");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "room"("id_room") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "event"("id_event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_id_session_fkey" FOREIGN KEY ("id_session") REFERENCES "session"("id_session") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intervene" ADD CONSTRAINT "intervene_id_session_fkey" FOREIGN KEY ("id_session") REFERENCES "session"("id_session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intervene" ADD CONSTRAINT "intervene_id_speaker_fkey" FOREIGN KEY ("id_speaker") REFERENCES "speaker"("id_speaker") ON DELETE CASCADE ON UPDATE CASCADE;
