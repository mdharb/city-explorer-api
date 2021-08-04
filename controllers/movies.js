'use strict';

const axios = require('axios');
const Movie = require('../models/Movie.js');

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
const MOVIES_API_URL = process.env.MOVIES_API_URL;


let getMovies = async (request,response) => {

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
};

module.exports = getMovies;
