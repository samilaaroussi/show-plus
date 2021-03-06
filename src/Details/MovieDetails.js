import React, { Component } from 'react';
import axios from 'axios';
import { Media, Modal, Button, Row, Col } from 'react-bootstrap';
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
      genre: [],
      loading: true
    };
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {
    var userLang = navigator.language || navigator.userLanguage;

    //load movie details, credits and videos ref from TheMovieDB API
    axios
      .all([
        axios.get(
          'https://api.themoviedb.org/3/movie/' +
            this.props.id +
            '?api_key=' +
            process.env.REACT_APP_API_KEY +
            '&language=' +
            userLang
        ),
        axios.get(
          'https://api.themoviedb.org/3/movie/' +
            this.props.id +
            '/credits?api_key=' +
            process.env.REACT_APP_API_KEY +
            '&language=' +
            userLang
        ),
        axios.get(
          'https://api.themoviedb.org/3/movie/' +
            this.props.id +
            '/videos?api_key=' +
            process.env.REACT_APP_API_KEY +
            '&language=' +
            userLang
        )
      ])
      .then(
        axios.spread((movieDetails, movieCredits, moviePreviews) => {
          this.setState({
            movieDetails: movieDetails.data,
            movieCreators: movieDetails.data.created_by,
            genre: movieDetails.data.genres[0],
            movieCredits: movieCredits.data.cast,
            country: movieDetails.data.production_countries[0],
            moviePreview: moviePreviews.data.results[0],
            loading: false
          });
        })
      );
  }

  render() {
    var bg = '';

    if (
      this.state.movieDetails.backdrop_path === undefined ||
      this.state.movieDetails.backdrop_path === null
    ) {
      bg = '#333';
    } else {
      bg =
        'url(https://image.tmdb.org/t/p/w500/' +
        this.state.movieDetails.backdrop_path +
        ')';
    }

    return (
      <div className="movieDetailsContainer">
        <div className="movieDetails" style={{ background: bg }} />
        <div className="movieDetailsOverlay">
          <Modal.Header closeButton={true} />

          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <Row>
                <Col md={12}>
                  <div className="movieTitle">
                    <span className="movieName">
                      {this.state.movieDetails.title}
                    </span>
                    <span className="movieDate">
                      {this.state.movieDetails.release_date
                        ? moment(this.state.movieDetails.release_date, [
                            'YYYY-MM-DD'
                          ]).year()
                        : ''}
                    </span>
                  </div>
                  <div className="movieSubtitle">
                    {this.state.country.iso_3166_1 + '  ·  '}
                    {this.state.genre.name + '  ·  '}
                    <i className="fa fa-clock-o" />
                    {' ' + this.state.movieDetails.runtime + ' min'}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <p className="movieOverview">
                    {this.state.movieDetails.overview}
                  </p>
                </Col>
                <Col md={4} sm={12} xs={12} />
              </Row>
              <Row>
                <Col md={12} xsHidden={true} className="movieCast">
                  {this.state.movieCredits.slice(0, 3).map((cast, i) => {
                    var avatar = '';

                    if (cast.profile_path === null) {
                      avatar = '/img/default-avatar.jpg';
                    } else {
                      avatar =
                        'https://image.tmdb.org/t/p/w500/' + cast.profile_path;
                    }

                    return (
                      <Col md={2} sm={4} key={i}>
                        <div className="flex-item">
                          <Media>
                            <Media.Left align="middle">
                              <div
                                style={{
                                  background: 'url(' + avatar + ') center',
                                  backgroundSize: 'cover',
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '25px'
                                }}
                              />
                            </Media.Left>
                            <Media.Body>{cast.name}</Media.Body>
                          </Media>
                        </div>
                      </Col>
                    );
                  })}
                </Col>
              </Row>
              <Row className="topBuffer">
                <Col md={12}>
                  <div className="movieLinks">
                    {this.state.moviePreview ? (
                      <Button
                        href={
                          'https://www.youtube.com/watch?v=' +
                          this.state.moviePreview.key
                        }
                        target="_blank"
                      >
                        <i className="fa fa-play-circle-o" /> Watch Preview
                      </Button>
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieDetails;
