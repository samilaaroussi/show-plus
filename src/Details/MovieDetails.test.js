import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';

var userLang = navigator.language || navigator.userLanguage;

test('testing API movie details', () => {
  return axios
    .all([
      axios.get(
        'https://api.themoviedb.org/3/movie/114?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=' +
          userLang
      ),
      axios.get(
        'https://api.themoviedb.org/3/movie/114/credits?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=' +
          userLang
      ),
      axios.get(
        'https://api.themoviedb.org/3/movie/114/videos?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=' +
          userLang
      )
    ])
    .then(
      console.log('test API movie details done')
    )
});
