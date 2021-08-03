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

  let lat = Number(request.query.lat);
  let lon = Number(request.query.lon);
  let searchQuery = request.query.searchQuery.toLocaleLowerCase();

  console.log(lat, lon, searchQuery);

  let cityWeatherResult = weatherData.find(city => city.lat === lat && city.lon === lon && city.city_name.toLocaleLowerCase() === searchQuery);
  console.log(cityWeatherResult);

  cityWeatherResult ? response.send(forecasting(cityWeatherResult)) : response.send(forecasting('City Unsupported', 500));
});

let forecasting = (weatherForecast) =>{
  let forecastArray = [];

  weatherForecast.weatherData.map(city => {
    let date = city.valid_date;
    let description = `Low of ${city.low_temp}, high of ${city.high_temp} with ${city.weather.description}`;

    forecastArray.push(new Forecast(date, description));
  });
  return forecastArray;
};

app.get((request, response) => {
  response.send(serverError('Something went wrong.', 500));
});

let serverError = (message, status) =>{
  return {error: message, status: status};
};

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
