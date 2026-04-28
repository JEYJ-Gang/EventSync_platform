CREATE ROLE eventsync_user WITH LOGIN PASSWORD '123456';
CREATE DATABASE eventsync_db;

GRANT ALL PRIVILEGES ON DATABASE eventsync_db TO eventsync_user;

# after "\c eventsync_db"
GRANT ALL ON SCHEMA public TO eventsync_user;