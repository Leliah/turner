const db = require('../db/dbConfig');

//RETURN ALL SONGS FROM DB
const getAllSongs = async () => {
    try {
      const allSongs = await db.any("SELECT * FROM songs");
      return allSongs;
    } catch (error) {
      return error;
    }
  };


//RETURN ONE SONG FROM DB //
const getSong = async (id) => {
    try {
        const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
        return oneSong
    } catch (error) {
        return error;
    }
};


//CREATE A SONG IN DB
const createSong = async (song) => {
    try {
        const newSong = await db.one(
            'INSERT INTO songs (song_name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [song.song_name, song.artist, song.album, song.time, song.is_favorite]
        );
        return newSong;
    } catch (error) {
        return error;
    }
};


//DELETE SONG
const deleteSong = async (id) => {
    try {
        const deletedSong = await db.one('DELETE FROM songs WHERE id = $1 RETURNING *', id);
        return deletedSong;
    } catch (error) {
        return error;
    }
};

//UPDATE/EDIT A SONG IN DB
const updateSong = async (id, song) => {
    try {
        const updatedSong = await db.one(
            'UPDATE songs SET song_name = $1, artist = $2, album = $3, time = $4, is_favorite = $5 WHERE id=$6 RETURNING *)',
            [song.song_name, song.artist, song.album, song.time, song.is_favorite, id]
        );
        return updatedSong;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong
}