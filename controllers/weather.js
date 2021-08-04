'use strict';


const axios = require('axios');
const Forecast = require('../models/Forecast.js');

const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const WEATHERBIT_API_URL = process.env.WEATHERBIT_API_URL;

let getWeather = async (request, response) => {

  let { lat, lon } = request.query;

  let weatherUrl = `${WEATHERBIT_API_URL}?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}&units=I`;

  try {

    let result = await axios.get(weatherUrl);

    let data = result.data.data.map(weather => {
      let weatherObj = new Forecast (weather.datetime, weather.weather.description);
      return weatherObj;
    });

    response.status(200).send(data);

  } catch (e) {
    console.error('error info: ', e);
  }
};

module.exports = getWeather;
