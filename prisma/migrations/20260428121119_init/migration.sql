-- CreateTable
CREATE TABLE "Event" (
    "id_event" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(150),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "Room" (
    "id_room" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "capacity" INTEGER,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id_room")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id_speaker" SERIAL NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "photo_url" TEXT,
    "biography" TEXT,
    "external_link" TEXT,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id_speaker")
);

-- CreateTable
CREATE TABLE "Session" (
    "id_session" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "start_time" TIME(6) NOT NULL,
    "end_time" TIME(6) NOT NULL,
    "max_participant" INTEGER,
    "id_room" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id_session")
);

-- CreateTable
CREATE TABLE "Question" (
    "id_question" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author_name" VARCHAR(50),
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "creation_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_session" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id_question")
);

-- CreateTable
CREATE TABLE "Intervene" (
    "id_session" INTEGER NOT NULL,
    "id_speaker" INTEGER NOT NULL,

    CONSTRAINT "Intervene_pkey" PRIMARY KEY ("id_session","id_speaker")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room"("id_room") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_id_session_fkey" FOREIGN KEY ("id_session") REFERENCES "Session"("id_session") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervene" ADD CONSTRAINT "Intervene_id_session_fkey" FOREIGN KEY ("id_session") REFERENCES "Session"("id_session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervene" ADD CONSTRAINT "Intervene_id_speaker_fkey" FOREIGN KEY ("id_speaker") REFERENCES "Speaker"("id_speaker") ON DELETE CASCADE ON UPDATE CASCADE;
