'use strict';


const axios = require('axios');
const Forecast = require('../models/Forecast.js');

const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const WEATHERBIT_API_URL = process.env.WEATHERBIT_API_URL;

let getWeather = async (request, response) => {

  let { lat, lon } = request.query;

  let queryParams = {
    params: {
      lon: lon,
      lat: lat,
      key: WEATHERBIT_API_KEY
    }
  };

  try {

    let result = await axios.get(WEATHERBIT_API_URL, queryParams);

    let data = result.data.data.map(weather => {
      let weatherObj = new Forecast (weather.datetime, weather.weather.description);
      return weatherObj;
    });

    response.status(200).json(data);

  } catch (e) {
    console.error('error info: ', e);
  }
};

module.exports = getWeather;
