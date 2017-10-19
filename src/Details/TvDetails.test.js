import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';

var userLang = navigator.language || navigator.userLanguage;

test('testing API TV details', () => {
  return axios
    .all([
      axios.get(
        'https://api.themoviedb.org/3/tv/114?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=' +
          userLang
      ),
      axios.get(
        'https://api.themoviedb.org/3/tv/114/credits?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=' +
          userLang
      ),
      axios.get(
        'https://api.themoviedb.org/3/tv/114/videos?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=' +
          userLang
      )
    ])
    .then(
      console.log('test API TV details done')
    )
});
