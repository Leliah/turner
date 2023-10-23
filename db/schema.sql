DROP DATABASE IF EXISTS playlist;

CREATE DATABASE playlist;

\c playlist;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY, song_name TEXT NOT NULL, artist TEXT NOT NULL, album TEXT, time TEXT, is_favorite BOOLEAN
);