import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      filterMovies: [],
      genres: []
    };
  }

  componentDidMount() {

    var self = this;
    const { cookies } = self.props;

     axios.all([
       axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US'),
       axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US')
    ])
    .then(axios.spread((tvGenres, movieGenres) => {
        var tvGenres = tvGenres.data.genres;
        var movieGenres = movieGenres.data.genres;
        this.setState({genres: tvGenres.concat(movieGenres)})
    }));

    //filter events
    axios.get('https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false')
     .then(items => {
       //console.log(items.data.results);
       this.setState({filterMovies: items.data.results});
     });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
