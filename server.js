'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());

const getMovies = require('./controllers/movies');
const getWeather = require('./controllers/weather');
const PORT = process.env.PORT;


app.get('/weather', getWeather );
app.get('/movies', getMovies);

app.get('*', notFoundHandler);

function notFoundHandler(req, res) {
  res.status(404).send('404: route not found');
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
