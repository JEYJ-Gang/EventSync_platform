CREATE TABLE event (
                       Id_event    SERIAL          PRIMARY KEY,
                       title       VARCHAR(20)     NOT NULL,
                       description TEXT,
                       start_date  TIMESTAMP not null,
                       end_date    TIMESTAMP not null,
                       location    VARCHAR(20)
);

CREATE TABLE room (
                      Id_room     SERIAL          PRIMARY KEY,
                      name        VARCHAR(20)     NOT NULL,
                      capacity    INT
);

CREATE TABLE speaker (
                         Id_speaker      SERIAL          PRIMARY KEY,
                         first_name      VARCHAR(150)    NOT NULL,
                         last_name       VARCHAR(150)    NOT NULL,
                         photo_url       TEXT,
                         biography       TEXT,
                         external_link   TEXT
);

CREATE TABLE session (
                         Id_session      SERIAL          PRIMARY KEY,
                         title           VARCHAR(20)     NOT NULL,
                         description     TEXT,
                         start_time      TIMESTAMP not null,
                         end_time        TIMESTAMP not null,
                         max_participant INT,
                         Id_room         INT             NOT NULL REFERENCES room(Id_room)       ON DELETE RESTRICT,
                         Id_event        INT             NOT NULL REFERENCES event(Id_event)     ON DELETE CASCADE
);

CREATE TABLE question (
                          Id_question         SERIAL          PRIMARY KEY,
                          content             TEXT            NOT NULL,
                          author_name         VARCHAR(50),
                          upvote              INT             DEFAULT 0,
                          creation_datetime   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP not null,
                          Id_session          INT             REFERENCES session(Id_session)  ON DELETE SET NULL
);

CREATE TABLE intervene (
                           Id_session  INT     NOT NULL REFERENCES session(Id_session)    ON DELETE CASCADE,
                           Id_speaker  INT     NOT NULL REFERENCES speaker(Id_speaker)    ON DELETE CASCADE,
                           PRIMARY KEY (Id_session, Id_speaker)
);