import React, { Component } from 'react';
import axios from 'axios';
import {Media, Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import CircularProgress from '../percentageCircle';
import '../App.css';
import './index.css';
var moment = require('moment');
moment().format();

class MovieDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
      movieCreators: [],
      movieCredits: [],
      moviePreview: [],
      country: [],
      genre: []
    };
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {

    var self = this;
    const { cookies } = self.props;
    var userLang = navigator.language || navigator.userLanguage;

    //load movie details, credits and videos ref from TheMovieDB API
     axios.all([
       axios.get('https://api.themoviedb.org/3/movie/' + this.props.id + '?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang),
       axios.get('https://api.themoviedb.org/3/movie/' + this.props.id + '/credits?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang),
       axios.get('https://api.themoviedb.org/3/movie/' + this.props.id + '/videos?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang)
    ])
    .then(axios.spread((movieDetails, movieCredits, moviePreviews) => {
      this.setState({movieDetails: movieDetails.data});
      this.setState({movieCreators: movieDetails.data.created_by});
      this.setState({genre: movieDetails.data.genres[0]});
      this.setState({movieCredits: movieCredits.data.cast});
      this.setState({country: movieDetails.data.production_countries[0]});
      this.setState({moviePreview: moviePreviews.data.results[0]});
    }));
  }

  render() {

    var bg='';

    if(this.state.movieDetails.backdrop_path === undefined || this.state.movieDetails.backdrop_path === null) {
      bg = '#333';
    }
    else {
      bg = "url(https://image.tmdb.org/t/p/w500/" + this.state.movieDetails.backdrop_path + ')';
    }

    return (
      <div className="movieDetailsContainer">
        <div className="movieDetails" style={{background: bg}}>
        </div>
        <div className="movieDetailsOverlay">
        <Modal.Header closeButton={true}>
        </Modal.Header>
          <Row>
            <Col md={12}>
              <div className="movieTitle">
                <span className="movieName">
                  {this.state.movieDetails.title}
                </span>
                <span className="movieDate">
                  {this.state.movieDetails.release_date ? moment(this.state.movieDetails.release_date, ["YYYY-MM-DD"]).year() : ''}
                </span>
              </div>
              <div className="movieSubtitle">
                {this.state.country.iso_3166_1 + '  ·  '}
                {this.state.genre.name + '  ·  '}
                <i className="fa fa-clock-o"></i>
                {' ' + this.state.movieDetails.runtime + ' min' }
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <p className="movieOverview">{this.state.movieDetails.overview}</p>
            </Col>
            <Col md={4} sm={12} xs={12}>
            </Col>
          </Row>
          <Row>
            <Col md={12} xsHidden={true} className="movieCast">
              {this.state.movieCredits.slice(0,3).map((cast, i) => {

                var avatar = '';

                if(cast.profile_path === null) {
                  avatar = '/img/default-avatar.jpg';
                }
                else {
                  avatar = "https://image.tmdb.org/t/p/w500/" + cast.profile_path;
                }

                return(
                  <Col md={2} sm={4} key={i}>
                    <div className="flex-item">
                      <Media>
                        <Media.Left align="middle">
                          <div style={{background: "url(" + avatar + ") center" , backgroundSize: 'cover', width: '50px', height: '50px', borderRadius: '25px'}}></div>
                        </Media.Left>
                        <Media.Body>
                          {cast.name}
                        </Media.Body>
                      </Media>
                    </div>
                  </Col>
                )
              })}
              </Col>
            </Row>
            <Row className='topBuffer'>
              <Col md={12}>
                <div className="movieLinks">
                  {this.state.moviePreview ? <Button href={'https://www.youtube.com/watch?v=' + this.state.moviePreview.key} target="_blank"><i className="fa fa-play-circle-o"></i> Watch Preview</Button> : ''}
                </div>
              </Col>
            </Row>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
