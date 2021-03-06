import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Modal, Row, Col, Grid } from 'react-bootstrap';
import _ from 'lodash';
import Header from './Header';
import CircularProgress from './percentageCircle';
import MovieDetails from './Details/MovieDetails';
import TvDetails from './Details/TvDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterMovies: [],
      genres: [],
      openDetails: [],
      type: 'movie', //type of media : 'movie' or 'tv'
      pageNumber: '1' //page number of the discover movie/tv list
    };

    this.closeDetails = this.closeDetails.bind(this);
  }

  //open a specific modal
  openDetails(id) {
    this.setState({
      openDetails: {
        [id]: true
      }
    });
  }

  //close a modal
  closeDetails() {
    this.setState({ openDetails: false });
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {
    var userLang = navigator.language || navigator.userLanguage;

    //load movies and tv genres list from TheMovieDB API
    axios
      .all([
        axios.get(
          'https://api.themoviedb.org/3/genre/tv/list?api_key=' +
            process.env.REACT_APP_API_KEY +
            '&language=' +
            userLang
        ),
        axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
            process.env.REACT_APP_API_KEY +
            '&language=' +
            userLang
        )
      ])
      .then(
        axios.spread((tvGenres, movieGenres) => {
          var tvG = tvGenres.data.genres;
          var movieG = movieGenres.data.genres;
          this.setState({ genres: tvG.concat(movieG) });
        })
      );

    //load tv/movies list from TheMovieDB API
    axios
      .get(
        'https://api.themoviedb.org/3/discover/' +
          this.state.type +
          '?api_key=' +
          process.env.REACT_APP_API_KEY +
          '&language=' +
          userLang +
          '&sort_by=popularity.desc&page=' +
          this.state.pageNumber +
          '&timezone=America/New_York&include_null_first_air_dates=false'
      )
      .then(items => {
        this.setState({ filterMovies: items.data.results });
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Grid>
          <Row>
            {/*display thumbnails, titles, genres, and scores from a list*/}
            {this.state.filterMovies.map((movie, i) => {
              var title = '';

              if (this.state.type === 'movie') {
                title = movie.title;
              } else {
                title = movie.name;
              }

              var circleClass = '';

              {
                /*4 different colors level for scores: red, yellow, light green and green*/
              }
              if (movie.vote_average <= 6) {
                circleClass = 'circularProgressFgRed';
              } else if (movie.vote_average > 6 && movie.vote_average <= 7) {
                circleClass = 'circularProgressFgOrange';
              } else if (movie.vote_average > 7 && movie.vote_average <= 8) {
                circleClass = 'circularProgressFgLightGreen';
              } else if (movie.vote_average > 8 && movie.vote_average <= 10) {
                circleClass = 'circularProgressFgGreen';
              }

              return (
                <Col key={i} md={3} sm={4} xs={12}>
                  <div
                    style={{ transitionDelay: '0.' + i + 's' }}
                    className="thumb center-block"
                  >
                    <div className="thumbImageContainer">
                      <div
                        className="thumbImage"
                        style={{
                          background:
                            'url(http://image.tmdb.org/t/p/w185/' +
                            movie.poster_path +
                            ')'
                        }}
                      />
                      <a
                        href="javascript:void(0)"
                        onClick={this.openDetails.bind(this, i)}
                      >
                        <div className="thumbImageOverlay">
                          <div className="rating">
                            {movie.vote_average ? (
                              <CircularProgress
                                circleClass={circleClass}
                                strokeWidth="4"
                                radius="24"
                                percentage={movie.vote_average * 10}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="thumbTitle">{title}</div>
                    <div className="thumbSubtitle">
                      <ul>
                        {movie.genre_ids.slice(0, 2).map((genreId, j) => {
                          let genre = _.find(this.state.genres, {
                            id: genreId
                          });
                          if (genre) {
                            return (
                              <li
                                style={{ transitionDelay: '0.' + j + 's' }}
                                key={j}
                              >
                                {genre.name}
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                  <Modal
                    bsSize="large"
                    show={this.state.openDetails[i] || false}
                    onHide={this.closeDetails}
                  >
                    {this.state.type === 'movie' ? (
                      <MovieDetails id={movie.id} />
                    ) : (
                      <TvDetails id={movie.id} />
                    )}
                  </Modal>
                </Col>
              );
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
