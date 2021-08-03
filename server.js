'use strict';

const express = require('express');
require('dotenv').config();
const weatherData = require('./data/weather.json');
const cors = require('cors');
const { request, response } = require('express');

const app = express();
app.use(cors());
const PORT = process.env.PORT;

const axios = require('axios');


app.get('/', (request, response) => {
  response.send('server is working!');
});

app.get('/weather', (request, response) => {

  try {
    let { searchQuery, lat, lon } = request.query;

    let cityWeatherResult = weatherData.find(city => city.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase() || (`${city.lat}` === lat && `${city.lon}` === lon)
    );

    let forecastArray = cityWeatherResult.data.map(elements => new Forecast(elements));
    response.send(forecastArray);
  }

  catch (e) {
    response.status(500).send('City not supported');
  }
});

class Forecast {
  constructor(value) {
    this.valid_date = value.valid_date;
    this.description = `${value.weather.description}`;
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
