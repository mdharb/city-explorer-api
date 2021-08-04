'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());

const getMovies = require('./controllers/movies.controllers');
const getWeather = require('./controllers/weather.controllers');
const PORT = process.env.PORT;


app.get('/weather', getWeather );
app.get('/movies', getMovies);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
