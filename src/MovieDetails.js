import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import CircularProgress from './percentageCircle';
import './App.css';

class MovieDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
      genres: [],
    };
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {

    var self = this;
    const { cookies } = self.props;

    //filter events
    https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
    axios.get('https://api.themoviedb.org/3/tv/' + this.props.id + '?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false')
     .then(items => {
       console.log(items.data);
       this.setState({movieDetails: items.data});
     });
  }

  render() {
    return (
      <div className="movieDetailsContainer">
        <div className="movieDetails" style={{background: "url(https://image.tmdb.org/t/p/w500/" + this.state.movieDetails.backdrop_path + ") #333"}}>
        </div>
        <div className="movieDetailsOverlay">
          hytgrfeedsz
        </div>
      </div>
    );
  }
}

export default MovieDetails;
