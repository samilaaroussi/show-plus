import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import ContentLoader, { Rect, Circle } from 'react-content-loader';
import _ from 'lodash';
import CircularProgress from './percentageCircle';
import './App.css';
var moment = require('moment');
moment().format();

class MovieDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
      creators: [],
      genre: [],
    };
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {

    var self = this;
    const { cookies } = self.props;
    var userLang = navigator.language || navigator.userLanguage;

    //filter events
    https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
    axios.get('https://api.themoviedb.org/3/tv/' + this.props.id + '?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang +'&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false')
     .then(items => {
       this.setState({movieDetails: items.data});
       this.setState({creators: items.data.created_by});
       this.setState({genre: items.data.genres[0]});
     });
  }

  render() {
    return (
      <div className="movieDetailsContainer">
        <div className="movieDetails" style={{background: "url(https://image.tmdb.org/t/p/w500/" + this.state.movieDetails.backdrop_path + ") #333"}}>
        </div>
        <div className="movieDetailsOverlay">
          <Col md={12}>
            <h1 className="movieTitle">{this.state.movieDetails.name}<small></small></h1>
            <div className="movieDate">
              {this.state.genre.name}

              {this.state.movieDetails.first_air_date && this.state.movieDetails.last_air_date ?
              ' | ' + moment(this.state.movieDetails.first_air_date, ["YYYY-MM-DD"]).year() + ' · ' +
              moment(this.state.movieDetails.last_air_date, ["YYYY-MM-DD"]).year() : ''}
            </div>
          </Col>
          <Col md={12}>
            <Image width="150" style={{float: 'left', marginRight: '30px'}} src={"http://image.tmdb.org/t/p/w185/" + this.state.movieDetails.poster_path} rounded/>
            <p className="movieOverview">{this.state.movieDetails.overview}</p>
            <p><a href={this.state.movieDetails.homepage}> More Infos <i className="fa fa-arrow-right"></i></a></p>
            <div className="movieList">
              <ul>CREATORS {this.state.creators.map((creator, i) => {return(<li key={i}>{creator.name}</li>)})}</ul>
            </div>
          </Col>

        </div>
      </div>
    );
  }
}

export default MovieDetails;
