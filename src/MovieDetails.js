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
      tvDetails: [],
      tvCreators: [],
      tvCredits: [],
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

     axios.all([
       axios.get('https://api.themoviedb.org/3/tv/' + this.props.id + '?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang),
       axios.get('https://api.themoviedb.org/3/tv/' + this.props.id + '/credits?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang)
    ])
    .then(axios.spread((tvDetails, tvCredits) => {
      this.setState({tvDetails: tvDetails.data});
      console.log(tvDetails.data);
      this.setState({tvCreators: tvDetails.data.created_by});
      this.setState({genre: tvDetails.data.genres[0]});
      this.setState({tvCredits: tvCredits.data.cast});
      console.log(tvDetails.data.created_by);
      console.log(tvCredits.data.cast);
    }));
  }

  render() {
    return (
      <div className="movieDetailsContainer">

        <div className="movieDetails" style={{background: "url(https://image.tmdb.org/t/p/w500/" + this.state.tvDetails.backdrop_path + ")"}}>
        </div>
        <div className="movieDetailsOverlay">
        <Modal.Header closeButton={true}>
        </Modal.Header>
        <Modal.Body>
          <Col md={12}>
            <h1 className="movieTitle">{this.state.tvDetails.name}<small></small></h1>
            <div className="movieSubtitle">
              {this.state.genre.name + ' | '}

              {this.state.tvDetails.number_of_seasons + ' Seasons'}

              {this.state.tvDetails.first_air_date ? ' | ' + moment(this.state.tvDetails.first_air_date, ["YYYY-MM-DD"]).year() : ' | '}
              {!this.state.tvDetails.in_production && this.state.tvDetails.last_air_date ? ' · ' + moment(this.state.tvDetails.last_air_date, ["YYYY-MM-DD"]).year() : ''}

            </div>
          </Col>
          <Col md={12}>
            <Image width="150" style={{float: 'left', marginRight: '30px'}} src={"http://image.tmdb.org/t/p/w185/" + this.state.tvDetails.poster_path} rounded/>
            <p className="movieOverview">{this.state.tvDetails.overview}</p>
            <div className="movieList">
              <ul>CREATORS {this.state.tvCreators.map((creator, i) => {return(<li key={i}>{creator.name}</li>)})}</ul>
              <ul>STARRING {this.state.tvCredits.slice(0,3).map((cast, i) => {return(<li key={i}>{cast.name}</li>)})}</ul>
            </div>
            <p><a href={this.state.tvDetails.homepage} target="_blank"> More Infos <i className="fa fa-arrow-right"></i></a></p>
          </Col>
        </Modal.Body>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
