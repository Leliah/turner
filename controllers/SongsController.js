//DEPENDENCIES
const express = require('express');
const songNames = express.Router();
const { getAllSongs, getSong, createSong, deleteSong, updateSong } = require('../queries/songs');


//INDEX
songNames.get('/', async (req, res) => {
     const showAll = await getAllSongs();
     console.log(showAll);
    if (showAll) {
        res.status(200).json(showAll);
      } else {
        res.status(500).json({ error: "server error" });
      }
});

//SHOW
songNames.get('/:id', async (req, res) => {
    //USES THE ID TYPED IN URL
    const { id } = req.params;
    //GETS THE SONG WITH THE SEARCHED ID AND CAPTURES IT IN SONG VARIABLE
    const song = await getSong(id);
    //IF A SONG IS IN THAT POSITION
    if(song) {
        //RESPOND WITH SONG
        res.json(song);
    } else {
        //IF NOT, THROW ERROR
        res.status(404).json({ error: "not found" })
    }
});


//CREATE
//ADD SONG TO SONG ARRAY
songNames.post('/', async (req, res) => {
    try {
        //CREATING CONTAINER TO HOLD WHAT CLIENT WANTED TO ADD 
        const song = await createSong(req.body);
        //RESPONDS WITH THAT INFO
        res.json(song);
    } catch (error) {
        res.status(400).json({ error: error })
    }
});

//DELETE
songNames.delete('/:id', async (req, res) => {
    //GETS ID FROM URL
    const { id } = req.params;
    //CREATES VARIABLE FOR SPECIFIC SONG
    const deletedSong = await deleteSong(id);
    //IF SONG WITH THE GIVEN ID IS DELETED SUCCESSFULLY, RESPOND WITH STATUS OKAY
    if(deletedSong.id) {
        res.status(200).json(deletedSong);
    } else {
        //IF NOT, ERROR
        res.status(404).json('Sorry, song not found.')
    }
});

//UPDATE
songNames.put(':/id', async (req, res) => {
    const { id } = req.params;
    const  updatedSong = await updateSong(id, req.body);
    res.status(200).json(updatedSong);
})

module.exports = songNames;