import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import MovieDetails from './Details/MovieDetails';
import TvDetails from './Details/TvDetails';
import App from './App';

var userLang = navigator.language || navigator.userLanguage;

test('testing API', () => {
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
      ),
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
      ),
      axios.get(
        'https://api.themoviedb.org/3/genre/tv/list?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=en-US'
      ),
      axios.get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=en-US'
      )
    ])
    .then(
      console.log('API test done')
    )
});
