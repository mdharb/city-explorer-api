'use strict';

const axios = require('axios');
const Movie = require('../models/Movie.js');
const Cache = require('../helper/cache');

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
const MOVIES_API_URL = process.env.MOVIES_API_URL;


let getMovies = async (request,response) => {

  let query = request.query.searchQuery;

  let queryParams = {
    params: {
      api_key: MOVIES_API_KEY,
      query
    }
  };

  try{

    let result = await axios.get(MOVIES_API_URL, queryParams);
    console.log(result.data.results);
    let data = result.data.results.map(movie => {
      let movieObj = new Movie (movie.title, movie.overview);
      return movieObj;
    });

    response.status(200).send(data);

  } catch(e) {
    console.log('error info: ', e);
  }
};

module.exports = getMovies;
