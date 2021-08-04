'use strict';

const express = require('express');
require('dotenv').config();
const weatherData = require('./data/weather.json');
const cors = require('cors');
const { request, response } = require('express');

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const WEATHERBIT_API_URL = process.env.WEATHERBIT_API_URL;
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
const MOVIES_API_URL = process.env.MOVIES_API_URL;


const Forecast = require('./models/Forecast.js');
const Movie = require('./models/Movie.js');

const axios = require('axios');

app.get('/weather', async (request, response) => {

  let { searchQuery, lat, lon } = request.query;
  let weatherUrl = `${WEATHERBIT_API_URL}?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}&units=I`;

  try {

    let result = await axios.get(weatherUrl);

    let data = result.data.data.map(weather => {
      let forecastArray = new Forecast (weather.datetime, weather.weather.description);
      return forecastArray;
    });
    response.status(200).send(data);
  } catch (e) {
    console.error('error info: ', e);
  }
});

app.get('/movies', async (request,response) => {
  let searchQuery = request.query.searchQuery;

  const movieUrl = `${MOVIES_API_URL}?api_key=${MOVIES_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  try{

    let result = await axios.get(movieUrl);

    let data = result.data.results.map(movie => {
      let movieObj = new Movie(movie.title, movie.overview);
      return movieObj;

    });
    response.status(200).send(data);

  } catch(e) {
    console.log('error info: ', e);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
