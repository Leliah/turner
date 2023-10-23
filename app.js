//DEPENDENCIES
const express = require('express');
const cors = require('cors');

//CONFIGURATION
const app = express();

//MIDDLEWARE
app.use(express.json()); //Parse incoming JSON
app.use(cors());

//LANDING PAGE
app.get('/', (req, res) => {
    res.send("Welcome to your Playlist");
});

//BOOK TITLES ROUTE
const songsController = require('./controllers/songsController');
app.use('/songs', songsController);

//404 PAGE
app.get('*', (req, res) => {
    res.status(404).send('Page Not Found.');
});
//EXPORT
module.exports = app;