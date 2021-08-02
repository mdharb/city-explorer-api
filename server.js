const { config } = require('dotenv');
const express = require('express');
require('dotenv')/config;
const app = express();
const PORT= process.env.PORT;


app.get('/data/weather.json',
  (request, response) => {
    let weatherData = {
        

    };
    response.json('Hello World');
  });

app.listen(PORT);
