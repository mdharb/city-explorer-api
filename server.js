'use strict';

const express = require('express');
const dotenv = require('dotenv');
const weatherData = require('./data/weather.json');
const cors = require('cors');
const { request, response } = require('express');

const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT;

const axios = require('axios');


app.get('/', (request, response) => {
  response.send('server is working!');
});

app.get('/weather', (request, response) => {

  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;

  console.log(lat, lon, searchQuery);

  let cityWeatherData = weatherData.find(city => city.city_name === searchQuery);
  console.log(cityWeatherData);
  if(cityWeatherData === undefined) {
    response.status(500).send('Unsupported city');

  } else {
    let cityForcasting = cityWeatherData.data.map(obj => new Forecast(obj.datetime, `Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description.toLowerCase()}`));
    response.send(cityForcasting);
  }
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
